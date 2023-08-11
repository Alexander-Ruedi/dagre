import { DagreData } from "../models/DataModels";

export const example2: DagreData = {
  nodes: [
    {
      id: "SG01",
      label: "SG01",
      type: "ENTITY",
      salesOutbound: 4.271445618578175e8,
      salesInbound: 1.9732840690584138e8,
      marginPercentOutbound: 22.48247926209531,
      marginPercentInbound: 18.639139161882266,
    },
    {
      id: "UK01",
      label: "UK01",
      type: "ENTITY",
      salesOutbound: 2573858.7943885946,
      salesInbound: 1911229.913266161,
      marginPercentOutbound: 32.415916262710034,
      marginPercentInbound: 4.761904931174294,
    },
    {
      id: "US01",
      label: "US01",
      type: "ENTITY",
      salesOutbound: 1.3243638056699889e9,
      salesInbound: 5.673611630227068e7,
      marginPercentOutbound: 32.44946929462333,
      marginPercentInbound: 11.194819099106367,
    },
    {
      id: "CH01",
      label: "CH01",
      type: "ENTITY",
      salesOutbound: 4.6478847824678206e8,
      salesInbound: 2.706975926682461e8,
      marginPercentOutbound: 40.66335877432565,
      marginPercentInbound: 18.57238194909987,
    },
    {
      id: "CN01",
      label: "CN01",
      type: "ENTITY",
      salesOutbound: 1.3171153795963016e8,
      salesInbound: 4.822014640318531e7,
      marginPercentOutbound: 9.538903250951757,
      marginPercentInbound: 21.627992425806628,
    },
    {
      id: "DE01",
      label: "DE01",
      type: "ENTITY",
      salesOutbound: 1.9124219851093373e9,
      salesInbound: 1.4269737951026805e7,
      marginPercentOutbound: 27.377970199091056,
      marginPercentInbound: 4.761904775042602,
    },
    {
      id: "JP01",
      label: "JP01",
      type: "ENTITY",
      salesOutbound: 3.343915882338794e8,
      salesInbound: 3.309274589798785e8,
      marginPercentOutbound: 20.189670622998953,
      marginPercentInbound: 23.73595481451217,
    },
    {
      id: "CA01",
      label: "CA01",
      type: "ENTITY",
      salesOutbound: 4.008225670924683e7,
      salesInbound: 1.5418280799464855e7,
      marginPercentOutbound: 25.99233534461213,
      marginPercentInbound: 14.851757196601058,
    },
    {
      id: "FR01",
      label: "FR01",
      type: "ENTITY",
      salesOutbound: 1.7746785365278392e9,
      salesInbound: 1.5202102498566754e9,
      marginPercentOutbound: 10.894427582213224,
      marginPercentInbound: 33.846321896969386,
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
      salesInbound: 3.621883742000014e8,
      marginPercentInbound: 26.15543489192516,
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
        id: "SG01",
      },
      buyer: {
        id: "UK01",
      },
    },
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
        id: "CA01",
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
        id: "SG01",
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
        id: "JP01",
      },
      buyer: {
        id: "CH01",
      },
    },
    {
      seller: {
        id: "CN01",
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
        id: "DE01",
      },
    },
    {
      seller: {
        id: "US01",
      },
      buyer: {
        id: "CH01",
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
        id: "US01",
      },
      buyer: {
        id: "#_US01",
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
        id: "SG01",
      },
      buyer: {
        id: "US01",
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
        id: "SG01",
      },
      buyer: {
        id: "CH01",
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
    {
      seller: {
        id: "CA01",
      },
      buyer: {
        id: "CH01",
      },
    },
  ],
};
