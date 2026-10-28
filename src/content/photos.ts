import type { StaticImageData } from "next/image";
import asphaltPlant from "@/assets/photos/asphalt-plant.jpg";
import biofuelPlant from "@/assets/photos/biofuel-plant.jpg";
import boilerHouse from "@/assets/photos/boiler-house.jpg";
import fuelTesting from "@/assets/photos/fuel-testing.jpg";
import heroRefinery from "@/assets/photos/hero-refinery-dusk.jpg";
import processPlant from "@/assets/photos/process-plant.jpg";
import storageTanks from "@/assets/photos/storage-tanks.jpg";
import teaEstate from "@/assets/photos/tea-estate.jpg";
import valvesDetail from "@/assets/photos/valves-detail.jpg";

/**
 * Site photography.
 *
 * These are openly licensed photographs used as representative imagery. They are
 * NOT the Amala Biofuels facility and are never captioned as such. The brief asks
 * for real plant, equipment, product, laboratory and team photos: replace each
 * one when available (keep the key, update or remove its `credit`).
 */
export type Photo = {
  src: StaticImageData;
  alt: string;
  credit: { title: string; author: string; license: string; licenseUrl?: string; source: string } | null;
};

export const photos = {
  hero: {
    src: heroRefinery,
    alt: "Illuminated industrial fuel processing units at dusk",
    credit: {
      title: "Dusk view of a refinery in Port Arthur, Texas",
      author: "Carol M. Highsmith, Library of Congress",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Dusk_view_of_the_Valero_Energy_Corporation%27s_refinery_in_Port_Arthur,_Texas_LCCN2014633835.tif",
    },
  },
  plant: {
    src: biofuelPlant,
    alt: "Storage silos and process buildings at a biofuel production plant",
    credit: {
      title: "Ethanol plant",
      author: "Unknown author",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Ethanol_plant.jpg",
    },
  },
  process: {
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
    alt: "Vertical storage tanks and rail tank cars at a bulk liquids facility",
    credit: {
      title: "Chemical plant in Charleston, West Virginia",
      author: "Carol M. Highsmith, Library of Congress",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:A_Dow_Chemical_plant_in_Charleston,_West_Virginia_LCCN2015631788.tif",
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
  lab: {
    src: fuelTesting,
    alt: "Gloved hands handling fuel sample bottles in a laboratory fume hood",
    credit: {
      title: "Fuel laboratory testing",
      author: "U.S. Air Force photo by Senior Airman Joseph Garcia",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:379th_ELRS_performs_fuel_testing_(9507671).jpg",
    },
  },
  tea: {
    src: teaEstate,
    alt: "Tea bushes beneath shade trees on a misty tea estate in Assam",
    credit: {
      title: "Beautiful Tea Garden of Dibrugarh, Assam",
      author: "Nilotpal Hazarika",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:Beautiful_Tea_Garden_of_Dibrugarh,Assam.jpg",
    },
  },
  asphalt: {
    src: asphaltPlant,
    alt: "Hot-mix asphalt plant with drum dryer, storage silo and aggregate stockpiles",
    credit: {
      title: "Asphalt plant, Spaceport America",
      author: "AllenS",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Asphalt_plant_Spaceport_America.jpg",
    },
  },
  boiler: {
    src: boilerHouse,
    alt: "Black-and-white interior of a boiler house with oil burners and distribution headers",
    credit: {
      title: "Boiler house, Manchester Street Generating Station",
      author: "Historic American Engineering Record, Library of Congress",
      license: "Public domain",
      source:
        "https://commons.wikimedia.org/wiki/File:Interior,_boiler_house,_at_elev._42%27-8%27_looking_west_at_distribution_headers_and_coal_and_oil_burners_of_retired_300_lb._boilers_-11,_10,_and_9._-_Manchester_Street_Generating_HAER_RI,4-PROV,193A-14.tif",
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
