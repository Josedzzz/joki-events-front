import { Purchase } from "../services/clientHistoryService";

interface UserHistoryEventProps {
  purchase: Purchase;
}

export default function UserHistoryEvent({ purchase }: UserHistoryEventProps) {
  return (
    <div className="bg-custom-dark shadow-md rounded-lg p-6 m-4 max-w-md text-white border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out bounce-in">
      <h3 className="text-2xl font-bold mb-4 text-blue-400">Details</h3>

      <p className="text-custom-white mb-1">
        <span className="font-semibold text-blue-400">Purchase Date:</span>{" "}
        {new Date(purchase.purchaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-300 mb-1">
        <span className="font-semibold text-blue-400">Payment Method:</span>{" "}
        {purchase.paymentMethod}
      </p>
      <p className="text-gray-300 mb-4">
        <span className="font-semibold text-blue-400">Total Amount:</span> $
        {purchase.totalAmount}
      </p>

      <h4 className="text-xl font-semibold mb-2 text-blue-400">Items</h4>
      <ul className="space-y-2">
        {purchase.purchasedItems.map((item, index) => (
          <li key={index} className="bg-custom-black rounded-lg p-4">
            <p className="text-custom-white">
              <span className="font-semibold text-blue-400">Locality:</span>{" "}
              {item.localityName}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">
                Tickets Selected:
              </span>{" "}
              {item.numTicketsSelected}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-blue-400">Paid Amount:</span>{" "}
              ${item.totalPaymentAmount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
