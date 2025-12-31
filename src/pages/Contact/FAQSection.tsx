const faqs = [
  {
    question: "Do you deliver in Kurunegala?",
    answer: "Yes, we deliver throughout Kurunegala and surrounding areas.",
  },
  {
    question: "Are your products certified?",
    answer:
      "All products are from Mahaweli Authority and government-certified suppliers.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash on delivery, bank transfers, and online payments.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Contact us via WhatsApp, phone, or visit our store to place your order.",
  },
];

export default function FAQSection() {
  return (
    <div className="mt-12 sm:mt-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Quick answers to common questions
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-0 shadow-sm rounded-2xl bg-white p-4 sm:p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              {faq.question}
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
