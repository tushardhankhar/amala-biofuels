import type { StaticImageData } from "next/image";
import biofuelPlant from "@/assets/photos/biofuel-plant.jpg";
import fuelNozzle from "@/assets/photos/fuel-nozzle.jpg";
import heroRefinery from "@/assets/photos/hero-refinery-dusk.jpg";
import oilseedField from "@/assets/photos/oilseed-field.jpg";
import processPlant from "@/assets/photos/process-plant.jpg";
import storageTanks from "@/assets/photos/storage-tanks.jpg";
import valvesDetail from "@/assets/photos/valves-detail.jpg";

/**
 * Site photography.
 *
 * These are openly licensed photographs of real industrial and biofuel
 * facilities, used as representative imagery. They are NOT Amala Biofuels
 * sites and are never captioned as such. Replace each one with approved
 * company photography when available (keep the same keys), then update or
 * remove its `credit`.
 */
export type Photo = {
  src: StaticImageData;
  alt: string;
  credit: { title: string; author: string; license: string; licenseUrl?: string; source: string } | null;
};

export const photos = {
  hero: {
    src: heroRefinery,
    alt: "Illuminated process units and storage sphere of an industrial fuel facility at dusk",
    credit: {
      title: "Dusk view of a refinery in Port Arthur, Texas",
      author: "Carol M. Highsmith, Library of Congress",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Dusk_view_of_the_Valero_Energy_Corporation%27s_refinery_in_Port_Arthur,_Texas_LCCN2014633835.tif",
    },
  },
  about: {
    src: biofuelPlant,
    alt: "Storage silos and process buildings at a biofuel production plant",
    credit: {
      title: "Ethanol plant",
      author: "Unknown author",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Ethanol_plant.jpg",
    },
  },
  refinery: {
    src: processPlant,
    alt: "Steel process structures, columns and pipework at an industrial processing plant",
    credit: {
      title: "Chemical plant near Mont Belvieu, Texas",
      author: "Carol M. Highsmith, Library of Congress",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:A_Chevron_chemical_plant_near_Mont_Belvieu,_east_of_Houston,_Texas_LCCN2014631270.tif",
    },
  },
  storage: {
    src: storageTanks,
    alt: "Vertical storage tanks with access platforms and rail tank cars at a bulk liquids facility",
    credit: {
      title: "Chemical plant in Charleston, West Virginia",
      author: "Carol M. Highsmith, Library of Congress",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:A_Dow_Chemical_plant_in_Charleston,_West_Virginia_LCCN2015631788.tif",
    },
  },
  nozzle: {
    src: fuelNozzle,
    alt: "Fuel dispenser control panel and nozzle at a fuel station",
    credit: {
      title: "Control panel and fuel nozzle at a gas station",
      author: "Shixart1985",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Control_panel_and_fuel_nozzle_at_a_gas_station.jpg",
    },
  },
  valves: {
    src: valvesDetail,
    alt: "Black-and-white detail of flanged valves and process pipework",
    credit: {
      title: "Valves and pipes at Hercules Parlin plant",
      author: "Hercules Incorporated; Farrell & Gage Films Inc.",
      license: "No known copyright restrictions",
      source: "https://commons.wikimedia.org/wiki/File:Valves_and_pipes_at_Hercules_Parlin_plant_-_DPLA_-_522e710ba4eb21bbc99576e7d6f8b652.jpg",
    },
  },
  field: {
    src: oilseedField,
    alt: "Flowering oilseed field under an open sky",
    credit: {
      title: "Rapeseed field",
      author: "George Chernilevsky",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Rapeseed_field_2012_G1.jpg",
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
