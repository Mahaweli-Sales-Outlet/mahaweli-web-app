# Mahaweli Sales Outlet — Backend Architecture Plan

## Node.js + PostgreSQL for POS & Web App

**Project Date:** December 29, 2025  
**Status:** Planning Phase (Ready for Implementation)  
**Stack:** Express.js, PostgreSQL, JWT, TanStack Query (frontend sync)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Database Design](#database-design)
4. [API Routes](#api-routes)
5. [Core Services](#core-services)
6. [Authentication & RBAC](#authentication--rbac)
7. [POS-Specific Features](#pos-specific-features)
8. [Implementation Phases](#implementation-phases)
9. [Technical Stack](#technical-stack)
10. [Security & Audit](#security--audit)

---

## Executive Summary

A **monolithic Node.js backend** serving two separate React frontends:

- **Web App (e-commerce):** Product browsing, customer checkout, account management
- **POS System (in-store):** Barcode scanning, thermal receipt printing, shift management, transaction holds

**Key Characteristics:**

- ✅ **Single PostgreSQL database** (eliminates sync complexity)
- ✅ **Shared business logic** (services used by both POS and web routes)
- ✅ **Role-based access control** (Manager, Cashier, Customer roles)
- ✅ **Comprehensive audit logging** (theft prevention via action logging)
- ✅ **Offline support via PWA** (cached product catalog, read-only when offline)
- ✅ **Future-proof** (`store_id` field on all tables for multi-location expansion)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React)                      │
├────────────────────────┬──────────────────────────────────┤
│   Web App              │   POS System                      │
│ - Product Browsing     │ - Barcode Scanning               │
│ - Cart Management      │ - Shift Management               │
│ - Customer Checkout    │ - Transaction Holds              │
│ - User Accounts        │ - Thermal Printing               │
└────────────────┬───────┴──────────────────┬─────────────────┘
                 │                          │
                 └──────────────┬───────────┘
                                │
                    HTTP REST API Layer
                  /api/web/* and /api/pos/*
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                    EXPRESS.JS SERVER                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Middleware Layer:                                            │
│  ├─ JWT Authentication                                       │
│  ├─ Role-Based Authorization (RBAC)                          │
│  ├─ Request Validation (Zod)                                 │
│  ├─ Audit Logging                                            │
│  ├─ Error Handling                                           │
│  └─ Request/Response Logging (Winston/Pino)                 │
│                                                               │
│  Route Handlers:                                              │
│  ├─ /api/auth (Login, PIN, Token Refresh)                   │
│  ├─ /api/web/* (Web e-commerce routes)                      │
│  └─ /api/pos/* (POS-specific routes)                        │
│                                                               │
│  Service Layer (Shared Business Logic):                       │
│  ├─ AuthService (Login, Token Management)                   │
│  ├─ ProductService (Stock Management, Barcode Lookup)       │
│  ├─ OrderService (Order Workflow)                           │
│  ├─ ShiftService (Open/Close Shifts, Z-Reports)            │
│  ├─ CartHoldService (Transaction Persistence)               │
│  ├─ DiscountService (Discount Application, Approvals)       │
│  ├─ AuditService (Action Logging)                           │
│  └─ AnalyticsService (Reports, Revenue Breakdown)           │
│                                                               │
│  Repository Layer (Data Access):                             │
│  ├─ UserRepository                                           │
│  ├─ ProductRepository                                        │
│  ├─ OrderRepository                                          │
│  ├─ ShiftRepository                                          │
│  └─ AuditLogRepository                                       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────┐
│              PostgreSQL Database (Single)                    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Core Tables:                                                │
│  ├─ users (email, pin_hash, role)                           │
│  ├─ products (barcode, price, stock)                        │
│  ├─ orders (customer, payment, delivery, status)            │
│  ├─ order_items (product_id, quantity, price)               │
│  ├─ categories (dairy, oils, juices, etc.)                  │
│  │                                                            │
│  Retail-Specific Tables:                                     │
│  ├─ shifts (open_cash, close_cash, variance)                │
│  ├─ transaction_holds (saved carts)                          │
│  ├─ discounts (percentage, line_item, requires_approval)    │
│  ├─ discount_applications (which order used which discount) │
│  │                                                            │
│  Audit & Logging Tables:                                     │
│  ├─ audit_logs (user, action, timestamp, record_id)         │
│  ├─ inventory_logs (stock changes, reason)                  │
│  └─ payment_transactions (payment status, reference)        │
│                                                               │
│  All tables include: store_id (default 1), created_at,      │
│  updated_at, deleted_at (soft deletes)                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Database Design

### Core Tables

#### **users**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  pin_hash VARCHAR(255), -- 4-digit PIN for POS staff
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('manager', 'cashier', 'customer')),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_store_id ON users(store_id);
```

#### **categories**

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_categories_store_id ON categories(store_id);
```

#### **products**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  barcode VARCHAR(100), -- Support EAN-13, Code128, or custom labels
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  brand VARCHAR(255),
  image_url VARCHAR(500),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_store_id ON products(store_id);
CREATE INDEX idx_products_is_active ON products(is_active);
```

#### **orders**

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- Generated: ORD-20250101-001
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  delivery_address TEXT,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cash', 'bank_transfer', 'online_payment')),
  delivery_method VARCHAR(50),
  order_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled')),
  notes TEXT,
  created_by INTEGER REFERENCES users(id), -- POS staff or NULL for web customers
  shift_id INTEGER REFERENCES shifts(id), -- Which shift this order belongs to (POS only)
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_created_by ON orders(created_by);
CREATE INDEX idx_orders_shift_id ON orders(shift_id);
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

#### **order_items**

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  line_total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

#### **discounts**

```sql
CREATE TABLE discounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(50) NOT NULL CHECK (discount_type IN ('percentage', 'line_item')), -- percentage = whole cart, line_item = single product
  value DECIMAL(10, 2) NOT NULL, -- % or Rs amount
  min_order_value DECIMAL(10, 2), -- Only apply if order total exceeds this
  max_discount DECIMAL(10, 2), -- Cap on discount amount
  requires_manager_approval BOOLEAN DEFAULT false, -- If discount > 10%, needs manager PIN
  is_active BOOLEAN DEFAULT true,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_discounts_store_id ON discounts(store_id);
```

#### **discount_applications**

```sql
CREATE TABLE discount_applications (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  discount_id INTEGER NOT NULL REFERENCES discounts(id),
  applied_amount DECIMAL(10, 2) NOT NULL,
  approved_by INTEGER REFERENCES users(id), -- Manager who approved if required
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_discount_applications_order_id ON discount_applications(order_id);
```

#### **shifts**

```sql
CREATE TABLE shifts (
  id SERIAL PRIMARY KEY,
  cashier_id INTEGER NOT NULL REFERENCES users(id),
  manager_id INTEGER REFERENCES users(id), -- Who closed the shift
  shift_start_time TIMESTAMP NOT NULL,
  shift_end_time TIMESTAMP,
  opening_cash DECIMAL(10, 2) NOT NULL,
  closing_cash DECIMAL(10, 2),
  expected_cash DECIMAL(10, 2), -- Calculated: opening_cash + order_totals - expenses
  variance DECIMAL(10, 2), -- closing_cash - expected_cash (negative = shortage, positive = excess)
  variance_status VARCHAR(50) CHECK (variance_status IN ('balanced', 'shortage', 'excess')),
  notes TEXT,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_shifts_cashier_id ON shifts(cashier_id);
CREATE INDEX idx_shifts_shift_start_time ON shifts(shift_start_time);
CREATE INDEX idx_shifts_store_id ON shifts(store_id);
```

#### **transaction_holds**

```sql
CREATE TABLE transaction_holds (
  id SERIAL PRIMARY KEY,
  hold_number VARCHAR(50) UNIQUE NOT NULL, -- HOLD-20250101-001
  cashier_id INTEGER NOT NULL REFERENCES users(id),
  cart_data JSON NOT NULL, -- Serialized cart: {items: [{product_id, quantity, price}, ...], total, subtotal}
  customer_name VARCHAR(255),
  hold_reason VARCHAR(255), -- "Customer forgot wallet", "Queue too long", etc.
  shift_id INTEGER REFERENCES shifts(id),
  is_recalled BOOLEAN DEFAULT false,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_transaction_holds_cashier_id ON transaction_holds(cashier_id);
CREATE INDEX idx_transaction_holds_shift_id ON transaction_holds(shift_id);
CREATE INDEX idx_transaction_holds_is_recalled ON transaction_holds(is_recalled);
```

#### **audit_logs**

```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- 'order_created', 'item_voided', 'discount_applied', 'shift_closed', etc.
  resource_type VARCHAR(100), -- 'order', 'product', 'shift', etc.
  resource_id INTEGER, -- ID of affected resource
  old_value JSON, -- Previous state (for updates/voids)
  new_value JSON, -- New state
  reason VARCHAR(255), -- Why (e.g., "Damaged item", "Customer request")
  ip_address VARCHAR(50),
  user_agent VARCHAR(500),
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_store_id ON audit_logs(store_id);
```

#### **inventory_logs**

```sql
CREATE TABLE inventory_logs (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity_before INTEGER NOT NULL,
  quantity_after INTEGER NOT NULL,
  change_reason VARCHAR(100) NOT NULL, -- 'sale', 'restock', 'adjustment', 'damage'
  reference_id INTEGER, -- order_id if sale, or NULL
  user_id INTEGER REFERENCES users(id),
  notes TEXT,
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_created_at ON inventory_logs(created_at);
CREATE INDEX idx_inventory_logs_store_id ON inventory_logs(store_id);
```

#### **payment_transactions**

```sql
CREATE TABLE payment_transactions (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed', 'refunded')),
  reference_id VARCHAR(255), -- Bank reference, transaction ID, etc.
  refund_amount DECIMAL(10, 2),
  refund_reason VARCHAR(255),
  refunded_by INTEGER REFERENCES users(id),
  store_id INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
CREATE INDEX idx_payment_transactions_order_id ON payment_transactions(order_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
```

---

## API Routes

### Authentication Routes (`/api/auth`)

#### Web/Admin Login

```
POST /api/auth/login
Request:
  {
    "email": "manager@mahaweli.com",
    "password": "secure_password_123"
  }
Response:
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "manager@mahaweli.com",
      "name": "Mahaweli Manager",
      "role": "manager",
      "storeId": 1
    }
  }
```

#### POS (Cashier) PIN Login

```
POST /api/auth/pos-login
Request:
  {
    "pin": "1234",
    "userId": 2  -- Cashier selects their name/photo from list
  }
Response:
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 2,
      "name": "Kamal (Cashier)",
      "role": "cashier",
      "storeId": 1
    }
  }
```

#### Token Refresh

```
POST /api/auth/refresh
Request:
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
Response:
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
```

#### Get Current User

```
GET /api/auth/me
Headers: Authorization: Bearer {token}
Response:
  {
    "success": true,
    "user": { id, email, name, role, storeId }
  }
```

#### Logout

```
POST /api/auth/logout
Headers: Authorization: Bearer {token}
Response:
  {
    "success": true,
    "message": "Logged out successfully"
  }
```

---

### Web App Routes (`/api/web`)

#### Products

```
GET /api/web/products?category=dairy&search=curd&inStock=true
Response:
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Fresh Curd",
        "price": 45.00,
        "category": "Dairy",
        "imageUrl": "...",
        "stock_quantity": 50,
        "is_featured": true
      },
      ...
    ]
  }

GET /api/web/products/:id
Response:
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Fresh Curd",
      "description": "...",
      "price": 45.00,
      "barcode": "1234567890123",
      "stock_quantity": 50,
      "category": "Dairy",
      "brand": "Mahaweli Premium"
    }
  }
```

#### Orders (Web Checkout)

```
POST /api/web/orders
Headers: Authorization: Bearer {token}
Request:
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "0771234567",
    "deliveryAddress": "123 Main St, Colombo",
    "items": [
      { "productId": 1, "quantity": 2 }
    ],
    "discountId": 5,
    "paymentMethod": "online_payment",
    "deliveryMethod": "home_delivery",
    "notes": "Please call before delivery"
  }
Response:
  {
    "success": true,
    "order": {
      "id": 101,
      "orderNumber": "ORD-20250101-001",
      "total": 450.00,
      "status": "pending"
    }
  }

GET /api/web/orders
Headers: Authorization: Bearer {token}
Response: [orders for logged-in customer]

GET /api/web/orders/:id
Response: Full order details with items
```

#### Discounts

```
GET /api/web/discounts
Response:
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "New Year Sale",
        "value": 10,
        "type": "percentage"
      }
    ]
  }
```

---

### POS Routes (`/api/pos`)

#### Barcode Lookup

```
GET /api/pos/barcode/:barcode
Headers: Authorization: Bearer {token}, Role: cashier|manager
Response:
  {
    "success": true,
    "product": {
      "id": 1,
      "name": "Fresh Curd",
      "barcode": "101",
      "price": 45.00,
      "stock_quantity": 50
    }
  }
```

#### Quick Checkout (POS Sale)

```
POST /api/pos/checkout
Headers: Authorization: Bearer {token}, Role: cashier|manager
Request:
  {
    "items": [
      { "productId": 1, "quantity": 2, "price": 45.00 }
    ],
    "paymentMethod": "cash",
    "discountIds": [1],
    "shiftId": 5,
    "customerName": "Walk-in Customer"
  }
Response:
  {
    "success": true,
    "order": {
      "id": 102,
      "orderNumber": "ORD-20250101-002",
      "total": 90.00,
      "receiptData": {
        "items": [...],
        "subtotal": 90,
        "tax": 0,
        "total": 90,
        "paymentMethod": "cash",
        "timestamp": "2025-01-01T14:30:00Z"
      }
    }
  }
```

#### Shift Management

**Open Shift**

```
POST /api/pos/shifts/open
Headers: Authorization: Bearer {token}, Role: cashier|manager
Request:
  {
    "openingCash": 5000.00,
    "notes": "Starting float for today"
  }
Response:
  {
    "success": true,
    "shift": {
      "id": 5,
      "openingCash": 5000.00,
      "startTime": "2025-01-01T08:00:00Z"
    }
  }
```

**Close Shift**

```
POST /api/pos/shifts/close
Headers: Authorization: Bearer {token}, Role: cashier|manager
Request:
  {
    "shiftId": 5,
    "closingCash": 45500.00,
    "notes": "All cash counted. No discrepancies."
  }
Response:
  {
    "success": true,
    "shift": {
      "id": 5,
      "closingCash": 45500.00,
      "expectedCash": 46000.00,
      "variance": -500.00,
      "varianceStatus": "shortage",
      "endTime": "2025-01-01T20:00:00Z"
    }
  }
```

**Get Z-Report (Daily Summary)**

```
GET /api/pos/shifts/:shiftId/z-report
Headers: Authorization: Bearer {token}, Role: manager (cashiers cannot view)
Response:
  {
    "success": true,
    "report": {
      "shiftId": 5,
      "date": "2025-01-01",
      "cashier": "Kamal",
      "openingCash": 5000.00,
      "closingCash": 45500.00,
      "expectedCash": 46000.00,
      "variance": -500.00,
      "varianceStatus": "shortage",
      "totalSales": 40500.00,
      "salesByPaymentMethod": {
        "cash": 30000.00,
        "card": 10500.00
      },
      "salesByCategory": {
        "dairy": 15000.00,
        "oils": 25500.00
      },
      "discountsGiven": 250.00,
      "ordersProcessed": 45,
      "topProducts": [...]
    }
  }
```

#### Transaction Hold/Recall

**Hold Current Transaction**

```
POST /api/pos/transactions/hold
Headers: Authorization: Bearer {token}, Role: cashier|manager
Request:
  {
    "shiftId": 5,
    "cartData": {
      "items": [
        { "productId": 1, "quantity": 3, "price": 45.00, "name": "Fresh Curd" }
      ],
      "subtotal": 135.00,
      "total": 135.00
    },
    "customerName": "John Doe",
    "reason": "Customer forgot wallet in car"
  }
Response:
  {
    "success": true,
    "transaction": {
      "id": 50,
      "holdNumber": "HOLD-20250101-001",
      "customerName": "John Doe",
      "total": 135.00,
      "heldAt": "2025-01-01T14:30:00Z"
    }
  }
```

**Recall Transaction**

```
POST /api/pos/transactions/recall/:holdId
Headers: Authorization: Bearer {token}, Role: cashier|manager
Response:
  {
    "success": true,
    "cartData": {
      "items": [...],
      "subtotal": 135.00,
      "total": 135.00
    },
    "message": "Transaction HOLD-20250101-001 recalled"
  }
```

**List Held Transactions**

```
GET /api/pos/transactions/held?shiftId=5
Response:
  {
    "success": true,
    "data": [
      {
        "id": 50,
        "holdNumber": "HOLD-20250101-001",
        "customerName": "John Doe",
        "total": 135.00,
        "heldAt": "2025-01-01T14:30:00Z"
      }
    ]
  }
```

#### Void/Refund (Manager Approval Required)

**Request Void**

```
POST /api/pos/orders/:orderId/void
Headers: Authorization: Bearer {token}, Role: cashier|manager
Request:
  {
    "reason": "Item scanned by mistake"
  }
Response (if discount > 10% or void required):
  {
    "success": false,
    "requiresApproval": true,
    "message": "Manager PIN required to proceed"
  }

Then Manager provides PIN:
POST /api/pos/orders/:orderId/void/approve
Request:
  {
    "managerPin": "4567",
    "reason": "Item scanned by mistake"
  }
Response:
  {
    "success": true,
    "message": "Order voided. Audit logged."
  }
```

#### Current Active Shift

```
GET /api/pos/shift/current
Headers: Authorization: Bearer {token}, Role: cashier|manager
Response:
  {
    "success": true,
    "shift": {
      "id": 5,
      "cashierId": 2,
      "openingCash": 5000.00,
      "startTime": "2025-01-01T08:00:00Z",
      "status": "active"
    }
  }
```

---

### Analytics Routes (`/api/analytics`)

#### Daily Summary (Manager Only)

```
GET /api/analytics/summary?date=2025-01-01
Headers: Authorization: Bearer {token}, Role: manager
Response:
  {
    "success": true,
    "summary": {
      "totalRevenue": 45000.00,
      "deliveredRevenue": 40000.00,
      "pendingRevenue": 5000.00,
      "ordersCount": 45,
      "averageOrderValue": 1000.00,
      "topProducts": [...],
      "revenueByPaymentMethod": {...},
      "revenueByCategory": {...}
    }
  }
```

#### Time Period Analysis

```
GET /api/analytics/revenue?period=month&startDate=2025-01-01&endDate=2025-01-31
Response:
  {
    "success": true,
    "data": {
      "totalRevenue": 1200000.00,
      "dailyBreakdown": [
        { "date": "2025-01-01", "revenue": 45000.00 },
        ...
      ],
      "topProducts": [...],
      "topCategories": [...]
    }
  }
```

---

## Core Services

### 1. AuthService

Responsibilities:

- Validate email + password (manager/admin login)
- Hash and validate 4-digit PIN (cashier login)
- Generate JWT tokens with role embedded
- Token refresh and validation
- User session management

```typescript
class AuthService {
  async loginWithEmail(email, password): Promise<{ token; refreshToken; user }>;
  async loginWithPIN(userId, pin): Promise<{ token; user }>;
  async refreshToken(refreshToken): Promise<{ token }>;
  async validateToken(token): Promise<{ decoded; valid }>;
  async logoutUser(userId): Promise<void>;
  async resetPIN(userId, newPin): Promise<void>; // Future
}
```

### 2. ProductService

Responsibilities:

- CRUD operations for products
- Stock management (decrement on sale, increment on restock)
- Barcode lookup for POS
- Filter/search for web app
- Inventory logging

```typescript
class ProductService {
  async getAll(filters: { category?; search?; inStock? }): Promise<Product[]>;
  async getById(productId): Promise<Product>;
  async create(productData): Promise<Product>; // Manager only
  async update(productId, updates): Promise<Product>; // Manager only
  async delete(productId): Promise<void>; // Manager only
  async decrementStock(productId, quantity, reason, referenceId): Promise<void>;
  async incrementStock(productId, quantity, reason): Promise<void>;
  async findByBarcode(barcode): Promise<Product>;
}
```

### 3. OrderService

Responsibilities:

- Create orders (from POS or web checkout)
- Update order status (pending → confirmed → delivered)
- Retrieve order history
- Generate unique order numbers
- Calculate totals with discounts

```typescript
class OrderService {
  async createOrder(data: {
    items;
    customer;
    payment;
    delivery;
    discount?;
  }): Promise<Order>;
  async getOrderById(orderId): Promise<Order>;
  async getOrders(filters: {
    status?;
    createdBy?;
    shiftId?;
    dateRange?;
  }): Promise<Order[]>;
  async updateStatus(orderId, newStatus): Promise<Order>;
  async applyDiscount(
    orderId,
    discountId
  ): Promise<{ discountAmount; newTotal }>;
  async generateOrderNumber(): Promise<string>;
  async cancelOrder(orderId, reason): Promise<void>;
  async voidOrderItem(orderId, itemId, reason, approvedBy?): Promise<void>;
}
```

### 4. ShiftService

Responsibilities:

- Open shifts (record opening cash)
- Close shifts (reconcile cash, calculate variance)
- Calculate variance (shortage/excess) with ±Rs. 50 tolerance
- Generate Z-Reports for daily reconciliation
- Track which orders belong to which shift
- Flag discrepancies (variance > ±Rs. 50) in red on dashboard

```typescript
class ShiftService {
  async openShift(cashierId, openingCash, notes?): Promise<Shift>;
  async closeShift(shiftId, closingCash, notes?): Promise<Shift>;
  async calculateVariance(
    shiftId
  ): Promise<{ expected; actual; variance; status; hasDiscrepancy }>;
  async getZReport(shiftId): Promise<ZReport>;
  async getCurrentShift(cashierId): Promise<Shift | null>;
  async getShiftOrders(shiftId): Promise<Order[]>;
  async detectDiscrepancy(variance): boolean; // Flag if variance > ±50 Rs
}
```

### 5. CartHoldService

Responsibilities:

- Save active cart to database (transaction hold)
- Retrieve held transactions for recall
- Generate hold numbers
- Mark transactions as recalled

```typescript
class CartHoldService {
  async holdTransaction(
    shiftId,
    cartData,
    customerName?,
    reason?
  ): Promise<{ holdNumber; id }>;
  async recallTransaction(holdId): Promise<{ cartData }>;
  async listHeldTransactions(shiftId): Promise<HoldTransaction[]>;
  async deleteHold(holdId): Promise<void>;
  async generateHoldNumber(): Promise<string>;
}
```

### 6. DiscountService

Responsibilities:

- Apply pre-configured discounts
- Check if manager approval required
- Calculate discount amounts
- Log discount applications

```typescript
class DiscountService {
  async getAvailableDiscounts(): Promise<Discount[]>;
  async applyDiscount(
    orderId,
    discountId
  ): Promise<{ amount; requiresApproval }>;
  async validateManagerApproval(discountId, managerPin): Promise<boolean>;
  async calculateDiscountAmount(
    discountId,
    subtotal,
    itemPrice?
  ): Promise<number>;
}
```

### 7. AuditService

Responsibilities:

- Log all sensitive actions (voids, refunds, discounts, shifts)
- Store user, action, timestamp, affected record
- Provide audit trail for theft prevention

```typescript
class AuditService {
  async logAction(
    userId,
    action,
    resourceType,
    resourceId,
    oldValue?,
    newValue?,
    reason?
  ): Promise<void>;
  async getAuditTrail(filters: {
    userId?;
    action?;
    dateRange?;
    resourceType?;
  }): Promise<AuditLog[]>;
  async detectSuspiciousActivity(shiftId): Promise<{ activities: AuditLog[] }>;
}
```

### 8. AnalyticsService

Responsibilities:

- Calculate daily/monthly revenue
- Revenue breakdown by payment method, category, product
- Order status distribution
- Stock analytics
- Customer analytics (repeat customers, etc.)

```typescript
class AnalyticsService {
  async getDailySummary(date, storeId): Promise<DailySummary>;
  async getRevenueTrend(startDate, endDate, storeId): Promise<{ daily: [] }>;
  async getRevenueByPaymentMethod(
    dateRange,
    storeId
  ): Promise<{ method: amount }>;
  async getRevenueByCategory(dateRange, storeId): Promise<{ category: amount }>;
  async getTopProducts(dateRange, limit, storeId): Promise<Product[]>;
  async getStockAnalytics(storeId): Promise<{ inStock; outOfStock; lowStock }>;
}
```

---

## Authentication & RBAC

### User Roles & Permissions

| Feature                   | Manager          | Cashier     | Customer         |
| ------------------------- | ---------------- | ----------- | ---------------- |
| **Login**                 | Email + Password | 4-Digit PIN | Email + Password |
| **Browse Products**       | ✅               | ✅          | ✅               |
| **Sell (Checkout)**       | ✅               | ✅          | ✅               |
| **Open Shift**            | ✅               | ✅          | ❌               |
| **Close Shift**           | ✅               | ✅          | ❌               |
| **View Z-Report**         | ✅               | ❌          | ❌               |
| **Manage Products**       | ✅               | ❌          | ❌               |
| **View Analytics**        | ✅               | ❌          | ❌               |
| **Approve Void/Refund**   | ✅               | ❌          | ❌               |
| **Approve Discount >10%** | ✅               | ❌          | ❌               |
| **Manage Users**          | ✅               | ❌          | ❌               |
| **View Audit Logs**       | ✅               | ❌          | ❌               |

### JWT Token Structure

```json
{
  "sub": "1",
  "email": "manager@mahaweli.com",
  "name": "Mahaweli Manager",
  "role": "manager",
  "storeId": 1,
  "iat": 1704067200,
  "exp": 1704153600,
  "type": "access"
}
```

### Authorization Middleware

```typescript
// Example middleware usage
app.get(
  "/api/pos/shifts/:id/z-report",
  authenticateToken(),
  authorizeRole(["manager"]), // Only managers
  ShiftController.getZReport
);

app.post(
  "/api/pos/checkout",
  authenticateToken(),
  authorizeRole(["manager", "cashier"]), // Both POS users
  PosController.checkout
);
```

---

## POS-Specific Features

### 1. Barcode Scanning

- **Format Support:** EAN-13, Code128, custom labels (e.g., "101" for loose curd)
- **Validation:** None. Treat barcode as generic string.
- **Flow:**
  1. Cashier taps barcode field (or uses USB scanner keyboard input)
  2. Scan product barcode
  3. System calls `GET /api/pos/barcode/:barcode`
  4. Product added to cart with quantity +1 automatically
  5. If quantity needs adjustment, tap quantity field → numpad popup
- **React Hook** (pseudo-code):
  ```typescript
  const useBarcodeScanner = (onProductScanned) => {
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Enter" && barcodeInput) {
          onProductScanned(barcodeInput);
          setBarcodeInput("");
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => removeEventListener("keydown", handleKeyDown);
    }, [barcodeInput]);
  };
  ```

### 2. Shift Management

- **Open Shift:** Cashier enters starting cash (float). System logs opening time.
- **Close Shift:** Cashier enters closing cash. System calculates variance.
- **Variance Formula:**
  ```
  Expected Cash = Opening Cash + Sum(Order Totals) - Refunds - Voids
  Variance = Closing Cash - Expected Cash
  Status = "balanced" (±0-50 Rs) | "discrepancy" (variance > ±50 Rs)
  ```
- **Alerts:**
  - **Green:** Variance within ±Rs. 50 (accounts for coin rounding) → "Balanced"
  - **Red:** Variance > ±Rs. 50 → Flagged as "Discrepancy" in database and highlighted in red on dashboard
- **Z-Report:** Managers view daily summary by shift (revenue, discounts, payment methods, top products, variance status)

### 3. Transaction Hold/Recall

- **Hold:** Current cart saved to `transaction_holds` table with unique `HOLD-20250101-001` number
- **Use Case:** Customer realizes they forgot wallet → "Hold" button → clears screen for next customer → Customer returns → "Recall" button → cart restored
- **Storage:** Database (survives app restart) + optional localStorage cache
- **Recall List:** Shows all active holds for current shift with customer name and total

### 4. Void/Refund with Manager Approval

- **Cashier Action:** Remove item from cart → system checks discount amount
- **Condition:** If total discount/void > 10% of order, require Manager PIN
- **Manager Approval Flow (Immediate Override):**
  1. Cashier clicks "Delete Item" button
  2. Modal opens on same screen: "Enter Manager PIN to Approve"
  3. Manager types 4-digit PIN (no screen switch)
  4. System validates PIN immediately
  5. Modal closes, item removed, audit_log created
  6. Transaction proceeds
- **Audit Trail:** Every void/refund logged with user, timestamp, reason, manager who approved, and timestamp

### 5. Receipt Printing (Auto-Print to Thermal Printer)

- **Library:** `react-to-print`
- **Data Flow:**
  1. Checkout completes → `OrderService.createOrder()` returns order with `receiptData`
  2. `receiptData` includes: order number, items, subtotal, discounts, total, payment method, timestamp
  3. React component renders invisible receipt using `<ComponentToPrint>` ref
  4. `useReactToPrint()` auto-triggers print to thermal printer
  5. Printer cuts receipt automatically (Windows printer setting)
- **No Manual Click:** Fully automated in `handleCheckoutSuccess()`

### 6. Offline Mode (PWA)

- **Behavior:** Read-Only Mode
- **Caching Strategy:**
  - On app load, fetch full product catalog → cache via TanStack Query `staleTime: Infinity`
  - Store in localStorage with `{products: [...], timestamp, expiresAt}`
  - Held transactions (carts) persist in localStorage → survive app restarts and crashes
- **Offline Detection:** Use browser `navigator.onLine` event listener
- **Auto-Refresh on Online:** Implement `window.addEventListener('online', () => { queryClient.refetchQueries() })` to auto-sync product data immediately when internet returns
- **UI:** Red banner when offline, "Checkout" button disabled/greyed out
- **Reasoning:** Prevents double-charging if stock syncs while offline

### 7. Discounts

- **Configuration:** Pre-configured by Manager (admin panel)
- **Types:**
  - Percentage (10% staff discount)
  - Line Item (50% for damaged item)
- **Approval Threshold:** If discount > 10% of order, requires Manager PIN
- **Examples:**
  - "Staff Discount 10%" → applied automatically
  - "Damaged Item 50%" → requires manager approval if applied to expensive item
  - "New Year 25%" → requires manager approval (>10%)
- **Audit Logging:** Every discount application logged with who applied it and if approved

### 8. Quick Payment Shortcuts

- **UI:** Large buttons for common amounts: [Rs 500], [Rs 1000], [Rs 5000]
- **Use Case:** Elderly staff quickly input partial payments or round amounts
- **Backend Support:** Standard `POST /api/pos/checkout` endpoint with amount field
- **No Special API Needed:** Just quick UI buttons that pre-fill amount field

---

## Decisions Made

### 1. PIN Code Reset Workflow ✅

- **Manager Reset Only:** Managers can reset cashier PINs from the Admin panel
- **No Master PIN:** If a PIN is forgotten, the Manager logs in with Email/Password to reset it
- **Storage:** PINs stored as bcrypt hashes, never plain text
- **Backend Endpoint:**
  ```
  POST /api/admin/users/:userId/reset-pin
  Headers: Authorization: Bearer {token}, Role: manager
  Request: { newPin: "1234" }
  Response: { success: true, message: "PIN reset for cashier" }
  ```

### 2. Shift Reconciliation Tolerance ✅

- **Threshold:** ±Rs. 50 (accounts for coin rounding)
- **Alerts:**
  - **Green:** Variance within ±Rs. 50 → "Balanced"
  - **Red:** Variance > ±Rs. 50 → "Discrepancy" flagged and highlighted in red on dashboard
- **Notification:** No automated notifications in Phase 1. Discrepancies highlighted in red on Daily Report dashboard
- **Database Field:** `variance_status` VARCHAR(50) with values: 'balanced' | 'discrepancy'

### 3. Offline Sync Strategy ✅

- **Product Sync:** Auto-refresh on internet return via `window.addEventListener('online', ...)` → triggers React Query refetch immediately
- **Held Carts:** Persist in localStorage with structure:
  ```json
  {
    "heldTransactions": [
      {
        "holdId": "HOLD-20250101-001",
        "cartData": {...},
        "timestamp": 1704067200
      }
    ]
  }
  ```
- **Survival:** Held carts survive app restarts, browser crashes, and device reboots
- **Backend Sync:** When cart recalled, system syncs with backend to verify product availability

### 4. Void/Refund Manager Approval Flow ✅

- **Interaction Style:** Immediate Override (no screen switching)
- **Flow:**
  1. Cashier clicks "Delete Item" button
  2. Modal opens on same screen: "Enter Manager PIN to Approve"
  3. Manager types 4-digit PIN (keyboard input on same screen)
  4. System validates PIN immediately against `users.pin_hash`
  5. If valid: Modal closes, item removed, audit_log created
  6. If invalid: Modal shows "Incorrect PIN" error, retry allowed
- **Audit Trail:** Logged as `{user: cashier, action: 'item_voided', approved_by: manager, timestamp, reason}`
- **Backend Endpoint:**
  ```
  POST /api/pos/orders/:orderId/items/:itemId/void
  Request: { reason: "Item scanned by mistake", managerPin?: "1234" }
  - If discount > 10%, managerPin is required
  - System validates PIN, then logs and proceeds
  ```

### 5. Multi-Currency ✅

- **Decision:** Hardcode LKR (Sri Lankan Rupees)
- **Database:** Use DECIMAL(10, 2) for all monetary fields (price, total, variance, etc.)
- **No currency_code column** needed in Phase 1
- **Display:** All UI hardcoded to show "Rs. " prefix or "LKR" suffix
- **Future:** If multi-location expands to other countries, add `currency_code` VARCHAR(3) at that time

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

- [ ] PostgreSQL database schema creation
- [ ] Express.js project setup with middleware
- [ ] AuthService (email login + PIN login + JWT)
- [ ] ProductService (CRUD, stock management)
- [ ] User authentication routes

**Deliverable:** Basic login screen working, products loadable from DB

### Phase 2: Core POS (Weeks 3-4)

- [ ] OrderService (create, update status)
- [ ] Barcode lookup endpoint
- [ ] POS checkout endpoint
- [ ] ShiftService (open, close, variance calculation)
- [ ] AuditService (action logging)

**Deliverable:** Barcode scanning → checkout flow working. Shifts open/close functional.

### Phase 3: Retail Features (Weeks 5-6)

- [ ] CartHoldService (hold/recall)
- [ ] DiscountService (apply, approve)
- [ ] Void/Refund with Manager PIN approval
- [ ] Z-Report generation
- [ ] Transaction hold/recall endpoints

**Deliverable:** Manager approval workflows, hold/recall, Z-Reports functional.

### Phase 4: Analytics & Reporting (Weeks 7-8)

- [ ] AnalyticsService (daily/monthly summaries)
- [ ] Revenue breakdown by payment method, category, product
- [ ] Audit trail queries
- [ ] Detect suspicious activity endpoint

**Deliverable:** Managers can view detailed analytics and daily summaries.

### Phase 5: Web App Integration (Weeks 9-10)

- [ ] Web checkout endpoint
- [ ] Update React Checkout.tsx with real API calls
- [ ] Customer account orders history
- [ ] Cart persistence (localStorage via Redux)
- [ ] Order confirmation page

**Deliverable:** Web customers can complete purchases end-to-end.

### Phase 6: Polish & Deployment (Weeks 11-12)

- [ ] Error handling refinement
- [ ] Rate limiting
- [ ] Performance tuning (indexes, query optimization)
- [ ] Environment configuration (dev/staging/production)
- [ ] Docker setup (optional)
- [ ] Documentation & deployment runbook

**Deliverable:** Production-ready backend ready for deployment.

---

## Technical Stack

### Backend

```
Runtime:        Node.js 18+ (LTS)
Framework:      Express.js 4.18+
Language:       TypeScript 5.0+
Database:       PostgreSQL 14+
Authentication: JWT (jsonwebtoken)
Validation:     Zod or Joi
Logging:        Winston or Pino
Error Handling: Express error middleware
File Upload:    Multer (future: image uploads for products)
Testing:        Jest + Supertest
Currency:       LKR (Sri Lankan Rupees) - Hardcoded, no multi-currency in Phase 1
```

### Database

```
Engine:         PostgreSQL 14+
Migrations:     Knex.js or TypeORM
Connection Pool: pg-pool (recommended 20 connections)
Backup:         Automated daily backups
```

### Development Tools

```
Package Manager: npm or yarn
Version Control: Git
Testing:        Jest
Linting:        ESLint + Prettier
Documentation:  Swagger/OpenAPI (optional)
```

### Frontend (React)

```
HTTP Client:    Axios (already configured)
State:          Redux Toolkit + React-Redux
Data Fetching:  TanStack React Query (polling for real-time sync)
Printing:       react-to-print (thermal receipt)
PWA:            Vite PWA Plugin (offline support)
```

### Infrastructure

```
API Server:     Express on Node.js
Database:       PostgreSQL (local or RDS)
File Storage:   Local filesystem (for receipts/logs) or S3 (future)
Monitoring:     PM2 or similar for process management
```

---

## Security & Audit

### Security Measures

1. **Password Hashing:** bcrypt (10-12 rounds) for manager passwords
2. **PIN Hashing:** bcrypt for cashier PINs (4-digit)
3. **JWT Tokens:**
   - Access token: 15-minute expiry
   - Refresh token: 7-day expiry
   - Secret key: Strong, stored in environment variable
4. **HTTPS:** Required in production (SSL/TLS certificate)
5. **Rate Limiting:**
   - Login attempts: Max 5 failed attempts → 15-minute lockout
   - API endpoints: 100 requests/minute per IP
6. **CORS:** Configured for web and POS app domains only
7. **SQL Injection Prevention:** Parameterized queries (pg library enforces)
8. **XSS Prevention:** Validation on all user inputs

### Audit Logging

Every sensitive action logged to `audit_logs`:

- User ID, action type, timestamp, affected resource
- Old value (before) and new value (after) for updates
- Reason (for voids, refunds, discounts)
- Manager approvals captured

**Example Audit Trail:**

```
10:30 AM - Kamal (Cashier) | ITEM_VOIDED | Product: "Curd" | Qty: 1 | Reason: "Scanned by mistake" | Approved: No | Record: Order #101

10:32 AM - Kamal (Cashier) | DISCOUNT_APPLIED | Discount: "Staff 10%" | Amount: Rs 50 | Order: #101 | Approved: No | Record: Order #101

10:35 AM - Manager (Admin) | VOID_APPROVED | Order: #101 | Item: "Curd" | Approval Reason: "Customer returned item" | Record: Order #101
```

### Compliance

- **Data Retention:** Orders kept indefinitely, audit logs retained for 3 years (GDPR/local compliance)
- **Soft Deletes:** All records use `deleted_at` timestamp instead of hard deletion
- **Staff Privacy:** PIN and password hashes never logged, only encrypted

---

## Future Enhancements (Post-MVP)

1. **Multi-Location Support:** Utilize `store_id` to expand to multiple branches with centralized analytics
2. **Customer Loyalty Program:** Track repeat customers, offer rewards
3. **Payment Gateway Integration:** Online payment processing (Stripe, PayPal, local Sri Lankan gateways)
4. **Inventory Management:** Auto-alerts for low stock, supplier integration
5. **Advanced Analytics:** ML-based demand forecasting, seasonal trends
6. **Mobile App:** Native POS app (React Native) for tablets
7. **Offline Sync:** Full offline checkout with automatic sync when online
8. **Receipt Email:** Email receipts to customers (SMTP)
9. **Subscription/Recurring Orders:** Allow customers to set up recurring orders
10. **Multi-Language:** Support Sinhala + Tamil UI for staff

---

## Success Criteria (MVP Launch)

✅ POS staff can scan barcodes and complete sales  
✅ Shifts can be opened/closed with accurate variance calculation  
✅ Manager can view Z-Reports and daily summaries  
✅ Web customers can browse products and checkout  
✅ Audit logs capture all sensitive actions  
✅ System handles offline gracefully (read-only)  
✅ Thermal receipts print automatically  
✅ No data loss or double-charging incidents

---

**Document Version:** 1.0  
**Last Updated:** December 29, 2025  
**Next Step:** Proceed to Phase 1 - Database & Backend Implementation
