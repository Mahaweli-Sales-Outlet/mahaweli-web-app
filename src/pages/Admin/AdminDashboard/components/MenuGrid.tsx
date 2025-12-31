import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DASHBOARD_MENU_ITEMS } from "../constants";

export default function MenuGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {DASHBOARD_MENU_ITEMS.map((item) => (
        <button
          key={item.title}
          onClick={() => navigate(createPageUrl(item.link))}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all group text-left"
        >
          <div
            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <item.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </button>
      ))}
    </div>
  );
}
