import { CheckCircle2Icon, MinusIcon, TimerReset } from "lucide-react";

interface OfferingFeature {
  name: string;
  features: { [feature: string]: boolean };
}

const offerings: OfferingFeature[] = [
  {
    name: "Simpleteam",
    features: {
      docs: true,
      folders: true,
      linksettings: true,
      advancedanalytics: true,
      timerecorded: true,
      blocklist: true,
      verifications: true,
      branding: true,
      upload: true,
      screenshot: true,
      support: true,
      nda: false,
      domains: false,
      support2: false,
      self: false,
      white: false,
    },
  },

  {
    name: "Simpleteam Data Rooms Plan",
    features: {
      docs: true,
      folders: true,
      linksettings: true,
      advancedanalytics: true,
      timerecorded: true,
      blocklist: true,
      verifications: true,
      branding: true,
      domains: true,
      support: true,
      notifications: true,
      rooms: true,
      users: false,
      sso: false,
      upload: true,
      migration: false,
      support2: false,
      self: false,
      white: false,
      nda: true,
      screenshot: true,
    },
  },

  // data room,whitelabelling
  {
    name: "Simpleteam Custom Plan",
    features: {
      docs: true,
      folders: true,
      linksettings: true,
      advancedanalytics: true,
      timerecorded: true,
      blocklist: true,
      verifications: true,
      branding: true,
      domains: true,
      support: true,
      notifications: true,
      rooms: true,
      users: true,
      migration: true,
      support2: true,
      sso: true,
      upload: true,
      self: false,
      white: false,
      nda: true,
      screenshot: true,
    },
  },

  // Add other tools in a similar format
];

// create an optimal data structure for me to easily manage a feature comparison table for different product tiers
// create a list of features that are common across all product tiers


const featureDisplayNames: { [key: string]: string } = {
  docs: "Unlimited documents",
  folders: "Unlimited folders",
  linksettings: "Custom Link Settings",
  advancedanalytics: "Advanced Analytics",
  timerecorded: "Time recorded on each page",
  blocklist: "Allow & Block List",
  verifications: "Email verifications",
  notifications: "Notifications",
  branding: "Custom data room branding",
  domains: "Custom domains for data rooms",
  rooms: "Unlimited data rooms",
  users: "User Groups",
  white: "Full white-labelling",
  nda: "NDA and agreements",
  sso: "SSO",
  upload: "Bulk upload",
  self: "Self-hosted on your servers",
  migration: "Migration from other platform",
  support: "48h email support ",
  support2: "24h  support ",
  screenshot: "Screenshot protection",
};

export default function ComparisonTable() {
  const renderFeatureName = (feature: string | boolean) => {
    // If the feature is a string, return it as is
    if (typeof feature === "string") {
      return feature;
    }

    // If the feature is a boolean, return a checkmark or a minus icon
    if (feature) {
      return (
        <CheckCircle2Icon
          className="h-6 w-6 flex-none text-[#fb7a00]"
          aria-hidden="true"
        />
      );
    } else {
      return (
        <MinusIcon
          className="h-6 w-6 flex-none text-black"
          aria-hidden="true"
        />
      );
    }
  };
  const featuresList = Object.keys(offerings[0].features);

  return (
    <div className="">
      {/* <div className="mt-20 px-6 py-12 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Compare best Docsend alternatives based on core features
            <br />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Check all the features you need to securely share documents
          </p>
        </div>
      </div> */}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-100">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
              <thead>
                <tr>
                  <th className="text-balance px-2 py-2 text-left text-sm font-semibold text-gray-900">
                    Data Room Feature
                  </th>
                  {offerings.map((tool) => (
                    <th
                      key={tool.name}
                      className="text-balance px-2 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      {tool.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border border-gray-300 bg-white">
                {featuresList.map((feature) => (
                  <tr key={feature}>
                    <td className="text-balance border border-gray-300 px-2 py-4 text-sm font-semibold text-gray-900">
                      {featureDisplayNames[feature]}
                    </td>
                    {offerings.map((tool) => (
                      <td
                        key={tool.name}
                        className={`px-2 py-4 text-sm ${tool.name === "Simpleteam"
                          ? "text-balance bg-green-50 font-semibold text-green-700"
                          : ""
                          }`} // Consistent text color, conditional background color
                      >
                        {tool.features[feature] ? 'Yes' : 'No'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
