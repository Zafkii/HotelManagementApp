type AssetItem = {
  image: string
  gif: string
}

type RoomType =
  | "default"
  | "budget"
  | "single"
  | "standard"
  | "couple"
  | "twin"
  | "family"
  | "executive"
  | "suite"
  | "presidential suite"

type MaintenanceType =
  | "being cleaned"
  | "out of service"
  | "inspection"
  | "repair"
  | "maintenance"

type AssetMap = {
  rooms: Record<RoomType, AssetItem>
  maintenance: Record<MaintenanceType, AssetItem>
}

export const Assets: AssetMap = {
  rooms: {
    default: {
      image: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    budget: {
      image: "https://i.postimg.cc/Prcd6z2F/budget.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    single: {
      image: "https://i.postimg.cc/cLn0Pgz1/single.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    standard: {
      image: "https://i.postimg.cc/cJ7ZLqZV/standard.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    couple: {
      image: "https://i.postimg.cc/FKDqjZWz/couple.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    twin: {
      image: "https://i.postimg.cc/ncMHYwYD/twin.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    executive: {
      image: "https://i.postimg.cc/90Sm6Gtb/executive.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    family: {
      image: "https://i.postimg.cc/BZmSFGD3/family-room.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    suite: {
      image: "https://i.postimg.cc/0jjqnbms/suite.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
    "presidential suite": {
      image: "https://i.postimg.cc/3RnT2gk1/presidential-suite.jpg",
      gif: "https://i.postimg.cc/g0PTMnRZ/tutorial.gif",
    },
  },
  maintenance: {},
}
