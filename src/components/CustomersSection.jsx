import React from "react";

const activities = [
  {
    name: "Emma Turner",
    action: "Ordered a new plant",
    time: "1 day ago",
    pic: "https://via.placeholder.com/50",
  },
  {
    name: "Liam Foster",
    action: "Ordered a new plant",
    time: "1 day ago",
    pic: "https://via.placeholder.com/50",
  },
  {
    name: "Olivia Reed",
    action: "Ordered a new plant",
    time: "2 days ago",
    pic: "https://via.placeholder.com/50",
  },
  {
    name: "Ethan Hayes",
    action: "Ordered a new plant",
    time: "3 days ago",
    pic: "https://via.placeholder.com/50",
  },
  {
    name: "Ava Simmons",
    action: "Ordered a new plant",
    time: "5 days ago",
    pic: "https://via.placeholder.com/50",
  },
  // Add more activities as needed
];

const CustomersSection = ({ isDarkMode }) => {
  return (
    <div
      className={`w-1/2 ${
        isDarkMode ? "bg-dark-bg" : "bg-light-bg"
      } p-4 rounded-lg shadow-xl`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDarkMode ? "text-amber-500" : "text-amber-800"
        }`}
      >
        Recent Activity
      </h2>
      <div
        className={`recent-activity max-h-56 overflow-auto ${
          isDarkMode ? "bg-dark-card" : "bg-white"
        } p-4 rounded-lg`}
      >
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="activity-item flex items-center">
              <img
                src={activity.pic}
                alt={activity.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p
                  className={`text-md font-semibold ${
                    isDarkMode ? "text-amber-400" : "text-amber-900"
                  }`}
                >
                  {activity.name}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {activity.action}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {activity.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomersSection;
