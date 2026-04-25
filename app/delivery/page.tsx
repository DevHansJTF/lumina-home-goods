export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16 border-b border-gray-200 dark:border-gray-800 pb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#EAEAEA]">Delivery & Shipping</h1>
      </div>

      <div className="prose prose-sm text-gray-500 dark:text-gray-400 mx-auto leading-relaxed">
        <p className="text-base text-[#141414] dark:text-[#EAEAEA] mb-12">
          We want your new pieces to arrive safely and securely. Read about our delivery processes and lead times below.
        </p>

        <h2 className="font-serif text-2xl text-[#141414] dark:text-[#EAEAEA] mt-12 mb-4">Standard Shipping</h2>
        <p className="mb-6">
          Most smaller decor items, textiles, and lighting are shipped via standard parcel services (e.g., FedEx, UPS).
          Orders are typically processed within 2-3 business days and delivered within 5-7 business days from the
          shipping date.
        </p>

        <h2 className="font-serif text-2xl text-[#141414] dark:text-[#EAEAEA] mt-12 mb-4">
          White Glove Furniture Delivery
        </h2>
        <p className="mb-6">
          For large pieces such as sofas, dining tables, and beds, we offer premium White Glove Delivery. Our delivery
          partners will bring the item into your home, place it in your room of choice, assemble it, and remove all
          packaging materials.
        </p>
        <p className="mb-6">
          Expect a lead time of 2-4 weeks for in-stock furniture items. Our team will contact you to schedule a specific
          delivery window.
        </p>

        <h2 className="font-serif text-2xl text-[#141414] dark:text-[#EAEAEA] mt-12 mb-4">International Shipping</h2>
        <p className="mb-6">
          Currently, we only ship to the contiguous United States. We are working diligently to expand our shipping
          destinations in the near future.
        </p>

        <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-10 border border-gray-200 dark:border-gray-800 mt-16 text-center">
          <h3 className="font-serif text-xl text-[#141414] dark:text-[#EAEAEA] mb-2">Need help with an order?</h3>
          <p className="mb-6 text-sm">Our customer support team is here for you.</p>
          <a
            href="/contact"
            className="inline-block border border-[#141414] dark:border-[#EAEAEA] px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold text-[#141414] dark:text-[#EAEAEA] hover:bg-[#141414] dark:hover:bg-[#EAEAEA] hover:text-white dark:hover:text-[#111111] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
