import type { ComponentType, SVGProps } from "react";

import BuildingArchitectureIcon from "@/components/icons/services/BuildingArchitectureIcon";
import FireSystemSignalIcon from "@/components/icons/services/FireSystemSignalIcon";
import GeneratorIcon from "@/components/icons/services/GeneratorIcon";
import ElectricalSystemIcon from "@/components/icons/services/ElectricalSystemIcon";
import AirConditioningIcon from "@/components/icons/services/AirConditioningIcon";
import PlumbingIcon from "@/components/icons/services/PlumbingIcon";
import BoilerHeatingIcon from "@/components/icons/services/BoilerHeatingIcon";
import WaterIcon from "@/components/icons/services/WaterIcon";
import KitchenwareIcon from "@/components/icons/services/KitchenwareIcon";
import TelecommunicationIcon from "@/components/icons/services/TelecommunicationIcon";
import CctvIcon from "@/components/icons/services/CctvIcon";
import ParkingAutomationIcon from "@/components/icons/services/ParkingAutomationIcon";

export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;

/**
 * Building cutaway SVG layer IDs. The cutaway component renders all
 * of these, normally invisible. When a service is active, the layers
 * listed in its `systems` array light up. One drawing, twelve stories.
 */
export type SystemLayer =
  | "structure"      // walls, floors, roof outlines — always visible at low opacity
  | "bms-overlay"    // glow around all systems simultaneously
  | "fire-detectors" // ceiling smoke detectors + speaker horns
  | "generator"      // basement/exterior generator + transformer
  | "electrical"     // panel board + wiring traces in walls
  | "hvac"           // rooftop AHU + ducts + diffusers
  | "plumbing"       // vertical pipe stacks + fixtures
  | "boiler"         // basement boiler + radiator zones
  | "water-treatment"// inlet tank + filter unit
  | "kitchen"        // commercial kitchen floor — hood + appliances
  | "telecom"        // cable trays running floor-to-floor
  | "cctv"           // camera dots on facade + NVR rack
  | "parking-gate";  // barrier gate at entrance

export type ServiceItem = {
  slug: string;
  title: { en: string; ka: string };
  description: { en: string; ka: string };
  image: string;
  Icon: ServiceIcon;
  /** Which cutaway layers to highlight when this service is active. */
  systems: SystemLayer[];
  /** Short category tag shown in the left list. */
  category: { en: string; ka: string };
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "building-management-system",
    title: {
      en: "Building management system (BMS)",
      ka: "შენობის მართვის სისტემა (BMS)",
    },
    category: { en: "Integration",        ka: "ინტეგრაცია" },
    description: {
      en: "Centralized supervisory layer integrating HVAC, lighting, fire detection, and access control under one dashboard. Operators see what's running, what's failing, and what needs service — without walking the building.",
      ka: "ცენტრალიზებული მართვის ფენა, რომელიც აერთიანებს HVAC-ს, განათებას, სახანძრო დეტექციას და წვდომის კონტროლს ერთ პანელზე. ოპერატორი ხედავს რა მუშაობს, რა აღარ მუშაობს და რას სჭირდება მომსახურება — შენობის შემოვლის გარეშე.",
    },
    image: "/media/images/services/building-management-system.webp",
    Icon: BuildingArchitectureIcon,
    systems: ["bms-overlay"],
  },
  {
    slug: "fire-alarm-sound",
    title: {
      en: "Fire alarm & emergency announcement",
      ka: "სახანძრო სიგნალიზაცია და შეტყობინების სისტემა",
    },
    category: { en: "Life Safety",         ka: "უსაფრთხოება" },
    description: {
      en: "Detection panel programming and zoned voice evacuation. Code-compliant signaling, monthly test documentation, and a panel layout your inspector can read at a glance.",
      ka: "სახანძრო პანელის პროგრამირება და ხანძრის შესახებ ხმოვანი შეტყობინებები ზონებად. რეგულაციების შესაბამისი სიგნალიზაცია, ყოველთვიური ტესტირების დოკუმენტაცია და ინსპექტორისთვის გასაგები პანელის სქემა.",
    },
    image: "/media/images/services/fire-alarm.avif",
    Icon: FireSystemSignalIcon,
    systems: ["fire-detectors"],
  },
  {
    slug: "generator-transformer",
    title: {
      en: "Generator & transformer systems",
      ka: "გენერატორი და ტრანსფორმატორი",
    },
    category: { en: "Power",               ka: "ენერგია" },
    description: {
      en: "Backup power sizing, transformer installation, and automatic transfer switching. Commissioning includes load-bank testing, and we stay on for the scheduled inspections.",
      ka: "სარეზერვო კვების სიმძლავრის გათვლა, ტრანსფორმატორის მონტაჟი და ავტომატური გადართვის სისტემა. ჩაბარება მოიცავს დატვირთვის ტესტს, ხოლო რეგულარული ინსპექციები ჩვენი მომსახურების ნაწილია.",
    },
    image: "/media/images/services/generator.avif",
    Icon: GeneratorIcon,
    systems: ["generator"],
  },
  {
    slug: "electrical-systems",
    title: {
      en: "Electrical systems",
      ka: "ელექტრო სისტემები",
    },
    category: { en: "Electrical",          ka: "ელექტრობა" },
    description: {
      en: "Main panels, sub-distribution, branch circuits. Load calculations documented up front. Cable labelling and as-built drawings handed over — not promised, delivered.",
      ka: "მთავარი პანელები, ქვედანაყოფი და ცალკეული წრედები. დატვირთვის გათვლები წინასწარ დოკუმენტირებული. კაბელის ნიშნულები და ფაქტობრივი ნახაზები ჩაბარებულია — დაპირების გარეშე, ფაქტობრივად.",
    },
    image: "/media/images/services/electrical-systems.avif",
    Icon: ElectricalSystemIcon,
    systems: ["electrical"],
  },
  {
    slug: "air-conditioning",
    title: {
      en: "HVAC, fresh air, heating & cooling",
      ka: "HVAC, ვენტილაცია, გათბობა-გაგრილება",
    },
    category: { en: "Mechanical",          ka: "მექანიკური" },
    description: {
      en: "AHU, chiller, VRF, ductwork, and controls. Designed around real occupancy load and indoor air quality — not nameplate tonnage. Commissioned with airflow measurements at each diffuser.",
      ka: "AHU, ჩილერი, VRF, ჰაერსავალები და კონტროლის სისტემები. დაპროექტებული რეალური დატვირთვისა და შიდა ჰაერის ხარისხის გათვალისწინებით — და არა მხოლოდ ნომინალური სიმძლავრით. ჩაბარდება დიფუზორებზე ჰაერნაკადის გაზომვით.",
    },
    image: "/media/images/services/hvac.avif",
    Icon: AirConditioningIcon,
    systems: ["hvac"],
  },
  {
    slug: "plumbing-mechanical",
    title: {
      en: "Plumbing & mechanical works",
      ka: "სანტექნიკა და მექანიკური სამუშაოები",
    },
    category: { en: "Plumbing",            ka: "სანტექნიკა" },
    description: {
      en: "Cold and hot water distribution, drainage, vent stacks, and pressure boosting. Coordinated up front with structural and electrical so the trades don't fight on site.",
      ka: "ცივი და ცხელი წყლის გაყვანილობა, კანალიზაცია, აერაცია და წნევის გასაძლიერებელი სისტემები. წინასწარ კოორდინირებული კონსტრუქციულ და ელექტრო სამუშაოებთან, რომ ობიექტზე კონფლიქტი არ წარმოიქმნას.",
    },
    image: "/media/images/services/plumbing.avif",
    Icon: PlumbingIcon,
    systems: ["plumbing"],
  },
  {
    slug: "boiler-heating",
    title: {
      en: "Boiler & heating systems",
      ka: "ქვაბი და გათბობის სისტემა",
    },
    category: { en: "Heating",             ka: "გათბობა" },
    description: {
      en: "Hydronic distribution, boiler installation, and manifold zoning. Service contracts include annual inspection, combustion tuning, and a logbook the building owner keeps.",
      ka: "ჰიდრონული გათბობის გავრცელება, ქვაბის მონტაჟი და მანიფოლდის ზონირება. სერვისის ხელშეკრულება მოიცავს ყოველწლიურ ინსპექციას, წვის რეგულირებას და ჟურნალს, რომელიც შენობის მფლობელთან რჩება.",
    },
    image: "/media/images/services/boiler-heating.avif",
    Icon: BoilerHeatingIcon,
    systems: ["boiler"],
  },
  {
    slug: "water-treatment",
    title: {
      en: "Water treatment",
      ka: "წყლის გასუფთავება",
    },
    category: { en: "Water",               ka: "წყალი" },
    description: {
      en: "Softening, filtration, and chemical dosing — sized against an actual water analysis of the site, not catalog defaults. Sensors flag when consumables run low, before the system does.",
      ka: "შერბილება, ფილტრაცია და ქიმიური დოზირება — დაპროექტებული ობიექტის წყლის რეალური ანალიზის საფუძველზე და არა მწარმოებლის სტანდარტებზე. სენსორები აფიქსირებენ მარაგების ამოწურვას სანამ სისტემა შეჩერდება.",
    },
    image: "/media/images/services/water-treatment.avif",
    Icon: WaterIcon,
    systems: ["water-treatment"],
  },
  {
    slug: "kitchen-laundry",
    title: {
      en: "Kitchen & laundry appliances",
      ka: "სამზარეულოს და სამრეცხაო ტექნიკა",
    },
    category: { en: "Appliances",          ka: "მოწყობილობები" },
    description: {
      en: "Commercial kitchen ventilation hoods, gas lines, and equipment hookup. Laundry venting, water hookup, and electrical sized for actual throughput — not the lowest-spec stub-up.",
      ka: "კომერციული სამზარეულოს გამწოვი ქოლგები, გაზსადენი და ტექნიკის მიერთება. სამრეცხაოს ვენტილაცია, წყლისა და ელექტროკავშირები — დაპროექტებული რეალური დატვირთვისთვის, არა მინიმუმისთვის.",
    },
    image: "/media/images/services/kitchen.avif",
    Icon: KitchenwareIcon,
    systems: ["kitchen"],
  },
  {
    slug: "telecommunication-tv",
    title: {
      en: "Telecommunication & TV systems",
      ka: "სატელეკომუნიკაციო და სატელევიზიო სისტემები",
    },
    category: { en: "Low Voltage",         ka: "დაბალი ძაბვა" },
    description: {
      en: "Structured cabling, distribution panels, and antenna systems. Cat-6 and fiber routed to spec, with room-by-room coverage planning before a single cable is pulled.",
      ka: "სტრუქტურირებული კაბელები, განაწილების პანელები და ანტენური სისტემები. Cat-6 და ოპტიკურ-ბოჭკოვანი — დაგებამდე ოთახ-ოთახ დაგეგმილი დაფარვით.",
    },
    image: "/media/images/services/telecommunication-tv.webp",
    Icon: TelecommunicationIcon,
    systems: ["telecom"],
  },
  {
    slug: "cctv-monitoring",
    title: {
      en: "CCTV & monitoring systems",
      ka: "CCTV და მონიტორინგი",
    },
    category: { en: "Surveillance",        ka: "მონიტორინგი" },
    description: {
      en: "IP camera networks, NVR setup, and remote-access configuration. Coverage planning happens before cable pulls — so dead angles get caught on paper, not in court.",
      ka: "IP კამერების ქსელი, NVR-ის კონფიგურაცია და დისტანციური წვდომა. დაფარვის გეგმა იქმნება კაბელის გაყვანამდე — რომ უხილავი წერტილები აღმოვაჩინოთ ნახაზზე და არა ფაქტობრივ მოვლენაში.",
    },
    image: "/media/images/services/cctv-monitoring.avif",
    Icon: CctvIcon,
    systems: ["cctv"],
  },
  {
    slug: "parking-automation",
    title: {
      en: "Parking automation",
      ka: "პარკინგის ავტომატიზაცია",
    },
    category: { en: "Automation",          ka: "ავტომატიზაცია" },
    description: {
      en: "Barrier gates, license plate recognition, and occupancy displays. Integrated with the building's access control so authorized vehicles never wait at the gate.",
      ka: "შლაგბაუმები, ნომრის ამოცნობის სისტემები და დატვირთვის ინდიკატორები. ინტეგრირებული შენობის წვდომის სისტემასთან — ავტორიზებული ავტომობილები არ ლოდინებენ შესასვლელთან.",
    },
    image: "/media/images/services/parking-automation.avif",
    Icon: ParkingAutomationIcon,
    systems: ["parking-gate"],
  },
];