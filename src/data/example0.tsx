import { DagreData } from "../models/DataModels";

export const example0: DagreData = {
  nodes: [
    {
      id: "CH",
      label: "CH01",
      type: "ENTITY",
      salesOutbound: 2,
      salesInbound: 1,
      marginPercentOutbound: 1,
      marginPercentInbound: 1,
    },
    {
      id: "DE",
      label: "DE01",
      type: "ENTITY",
      salesOutbound: 2,
      salesInbound: 1,
      marginPercentOutbound: 1,
      marginPercentInbound: 1,
    },
    {
      id: "SG",
      label: "SG01",
      type: "ENTITY",
      salesOutbound: 2,
      salesInbound: 1,
      marginPercentOutbound: 1,
      marginPercentInbound: 1,
    },
    {
      id: "FR",
      label: "FR01",
      type: "ENTITY",
      salesOutbound: 2,
      salesInbound: 1,
      marginPercentOutbound: 1,
      marginPercentInbound: 1,
    },
  ],
  edges: [
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
        id: "SG01",
      },
      buyer: {
        id: "CH01",
      },
    },
    {
      seller: {
        id: "FR01",
      },
      buyer: {
        id: "CH01",
      },
    },
    {
      seller: {
        id: "FR01",
      },
      buyer: {
        id: "DE01",
      },
    },
    {
      seller: {
        id: "FR01",
      },
      buyer: {
        id: "SG01",
      },
    },
  ],
};
