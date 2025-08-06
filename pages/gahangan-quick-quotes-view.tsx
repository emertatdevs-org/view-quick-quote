import React, { useEffect, useState } from "react";

type ProductDetail = {
  code: string;
  brand: string;
  quantity: string;
};

type Quote = {
  id: number;
  attributes: {
    firstname: string;
    lastname: string;
    businessname: string | null;
    phone: string;
    email: string | null;
    rfqnumber: string | null;
    note: string | null;
    createdAt: string;
    productDetails: ProductDetail[] | null;
    sourcePage: string;
  };
};

export default function QuickQuotesPage() {
  const [data, setData] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://gahangan-api.partoir.ir/api/quick-quotes");
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <p className="p-8 text-center text-lg">Loading...</p>;

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">📋 Quick Quote Requests</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-blue-100 text-gray-700">
            <tr className="text-left">
              <th className="px-4 py-3">👤 Name</th>
              <th className="px-4 py-3">🏢 Business</th>
              <th className="px-4 py-3">📞 Phone</th>
              <th className="px-4 py-3">✉️ Email</th>
              <th className="px-4 py-3">📝 Note</th>
              <th className="px-4 py-3">🕓 Date</th>
              <th className="px-4 py-3">📦 Products</th>
              <th className="px-4 py-3">🔗 Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(({ id, attributes }) => {
              const products = attributes.productDetails;

              return (
                <tr key={id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {attributes.firstname} {attributes.lastname}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{attributes.businessname || "-"}</td>
                  <td className="px-4 py-3 text-blue-800 font-semibold">{attributes.phone || "-"}</td>
                  <td className="px-4 py-3">
                    {attributes.email ? (
                      <a
                        href={`mailto:${attributes.email}`}
                        className="text-blue-600 underline hover:text-blue-800 transition"
                      >
                        {attributes.email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs whitespace-pre-line">{attributes.note || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(attributes.createdAt).toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    {products && products.length > 0 ? (
                      <div className="border border-gray-200 rounded-md shadow-sm bg-white overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 text-gray-600">
                            <tr>
                              <th className="px-2 py-1 text-left">Code</th>
                              <th className="px-2 py-1 text-left">Brand</th>
                              <th className="px-2 py-1 text-left">Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((p, idx) => (
                              <tr key={idx} className="border-t border-gray-100">
                                <td className="px-2 py-1">{p.code}</td>
                                <td className="px-2 py-1">{p.brand}</td>
                                <td className="px-2 py-1">{p.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{attributes.sourcePage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
