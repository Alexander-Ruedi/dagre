import { DagreData } from "../models/DataModels";

export const example1: DagreData = {
  nodes: [
    {
      id: "UK01",
      label: "UK01",
      type: "ENTITY",
      salesOutbound: 2573858.7943885946,
      salesInbound: 0.0,
      marginPercentOutbound: 32.415916262710034,
    },
    {
      id: "SG01",
      label: "SG01",
      type: "ENTITY",
      salesOutbound: 3.756900941713336e8,
      salesInbound: 1.9732840690584138e8,
      marginPercentOutbound: 23.636446008890125,
      marginPercentInbound: 18.639139161882266,
    },
    {
      id: "US01",
      label: "US01",
      type: "ENTITY",
      salesOutbound: 1.324109814999985e9,
      salesInbound: 4.688618489517531e7,
      marginPercentOutbound: 32.436511755634626,
      marginPercentInbound: 12.934757673776026,
    },
    {
      id: "CH01",
      label: "CH01",
      type: "ENTITY",
      salesOutbound: 3.893433498934611e8,
      salesInbound: 2.6683799920032784e8,
      marginPercentOutbound: 29.165382721695146,
      marginPercentInbound: 18.45610152848827,
    },
    {
      id: "CN01",
      label: "CN01",
      type: "ENTITY",
      salesOutbound: 1.3102990300666833e8,
      salesInbound: 4.7247129024303675e7,
      marginPercentOutbound: 9.068312614673296,
      marginPercentInbound: 21.99419536521643,
    },
    {
      id: "DE01",
      label: "DE01",
      type: "ENTITY",
      salesOutbound: 1.9124219851093512e9,
      salesInbound: 0.0,
      marginPercentOutbound: 27.37797019909214,
    },
    {
      id: "JP01",
      label: "JP01",
      type: "ENTITY",
      salesOutbound: 3.343883251408377e8,
      salesInbound: 3.2844296514702994e8,
      marginPercentOutbound: 20.18889180235582,
      marginPercentInbound: 23.872686806488463,
    },
    {
      id: "CA01",
      label: "CA01",
      type: "ENTITY",
      salesOutbound: 4.0064858994893804e7,
      salesInbound: 1.512024315744755e7,
      marginPercentOutbound: 25.960198348703248,
      marginPercentInbound: 15.050639963537924,
    },
    {
      id: "FR01",
      label: "FR01",
      type: "ENTITY",
      salesOutbound: 1.7746785365278392e9,
      salesInbound: 1.4260004089795818e9,
      marginPercentOutbound: 10.894427582213224,
      marginPercentInbound: 30.377109003474754,
    },
    {
      id: "US02",
      label: "US02",
      type: "ENTITY",
      salesOutbound: 0.0,
      salesInbound: 9.619132757999876e8,
      marginPercentInbound: 34.801616197840275,
    },
    {
      id: "#_CN01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 1.309822922146973e8,
      marginPercentInbound: 9.063154799657703,
    },
    {
      id: "#_DE01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 2.472829045922676e7,
      marginPercentInbound: 20.965783676969185,
    },
    {
      id: "#_JP01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 3.343883251408377e8,
      marginPercentInbound: 20.18889180235582,
    },
    {
      id: "#_UK01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 160117.8335113496,
      marginPercentInbound: 24.966186392990046,
    },
    {
      id: "#_US01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 3.6218837419999737e8,
      marginPercentInbound: 26.15543489192377,
    },
    {
      id: "#_CH01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 3.273333181580596e8,
      marginPercentInbound: 32.14224206755609,
    },
    {
      id: "#_CA01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 4.0064858994893804e7,
      marginPercentInbound: 25.960198348703248,
    },
    {
      id: "#_FR01",
      label: "#",
      type: "UNKNOWN",
      salesOutbound: 0.0,
      salesInbound: 1.7746785365278392e9,
      marginPercentInbound: 10.894427582213224,
    },
  ],
  edges: [
    {
      seller: {
        id: "UK01",
      },
      buyer: {
        id: "SG01",
      },
    },
    {
      seller: {
        id: "UK01",
      },
      buyer: {
        id: "CH01",
      },
    },
    {
      seller: {
        id: "SG01",
      },
      buyer: {
        id: "JP01",
      },
    },
    {
      seller: {
        id: "US01",
      },
      buyer: {
        id: "US02",
      },
    },
    {
      seller: {
        id: "CH01",
      },
      buyer: {
        id: "US01",
      },
    },
    {
      seller: {
        id: "CN01",
      },
      buyer: {
        id: "#_CN01",
      },
    },
    {
      seller: {
        id: "DE01",
      },
      buyer: {
        id: "#_DE01",
      },
    },
    {
      seller: {
        id: "JP01",
      },
      buyer: {
        id: "#_JP01",
      },
    },
    {
      seller: {
        id: "DE01",
      },
      buyer: {
        id: "CH01",
      },
    },
    {
      seller: {
        id: "DE01",
      },
      buyer: {
        id: "SG01",
      },
    },
    {
      seller: {
        id: "US01",
      },
      buyer: {
        id: "FR01",
      },
    },
    {
      seller: {
        id: "UK01",
      },
      buyer: {
        id: "#_UK01",
      },
    },
    {
      seller: {
        id: "DE01",
      },
      buyer: {
        id: "FR01",
      },
    },
    {
      seller: {
        id: "SG01",
      },
      buyer: {
        id: "CN01",
      },
    },
    {
      seller: {
        id: "CN01",
      },
      buyer: {
        id: "FR01",
      },
    },
    {
      seller: {
        id: "US01",
      },
      buyer: {
        id: "#_US01",
      },
    },
    {
      seller: {
        id: "CH01",
      },
      buyer: {
        id: "#_CH01",
      },
    },
    {
      seller: {
        id: "CA01",
      },
      buyer: {
        id: "#_CA01",
      },
    },
    {
      seller: {
        id: "CH01",
      },
      buyer: {
        id: "FR01",
      },
    },
    {
      seller: {
        id: "UK01",
      },
      buyer: {
        id: "FR01",
      },
    },
    {
      seller: {
        id: "CH01",
      },
      buyer: {
        id: "CA01",
      },
    },
    {
      seller: {
        id: "FR01",
      },
      buyer: {
        id: "#_FR01",
      },
    },
  ],
};
