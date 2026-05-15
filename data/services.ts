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
      en: "Centralized supervisory control across HVAC, lighting, fire and access — unified under a single operational layer.",
      ka: "HVAC-ის, განათების, ხანძარსაწინააღმდეგო და წვდომის სისტემების ცენტრალიზებული მართვა — ერთიან ოპერაციულ პლატფორმაზე.",
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
      en: "Code-compliant detection and zoned voice evacuation — engineered, commissioned and documented for inspection.",
      ka: "ნორმატივებთან შესაბამისი დეტექცია და ზონური ხმოვანი ევაკუაცია — დაპროექტებული, ჩაბარებული და ინსპექციისთვის დოკუმენტირებული.",
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
      en: "Backup power and medium-voltage infrastructure — sized, installed and load-tested under a single delivery scope.",
      ka: "სარეზერვო კვება და საშუალო ძაბვის ინფრასტრუქტურა — გათვლილი, მონტაჟირებული და დატვირთვით ტესტირებული ერთიანი მიწოდების ფარგლებში.",
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
      en: "Distribution from main panel to final circuit — calculated, executed and handed over with full as-built documentation.",
      ka: "განაწილება მთავარი პანელიდან ბოლო წრედამდე — გათვლილი, შესრულებული და ფაქტობრივი ნახაზებით ჩაბარებული.",
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
      en: "Full mechanical scope — AHU, chiller, VRF and ductwork — designed for real load and commissioned to measured performance.",
      ka: "სრული მექანიკური სამუშაოები — AHU, ჩილერი, VRF და ჰაერსავალები — დაპროექტებული რეალურ დატვირთვაზე და გაზომილ მაჩვენებლებზე ჩაბარებული.",
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
      en: "Water supply, drainage and pressure systems — coordinated with structural and electrical from the design stage.",
      ka: "წყალმომარაგება, კანალიზაცია და წნევის სისტემები — კონსტრუქციულ და ელექტრო ნაწილთან კოორდინირებული საპროექტო ეტაპიდან.",
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
      en: "Hydronic heating and zoned distribution — installed, commissioned and maintained under a single service contract.",
      ka: "ჰიდრონული გათბობა და ზონური განაწილება — მონტაჟი, ჩაბარება და ტექნიკური მომსახურება ერთიანი ხელშეკრულებით.",
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
      en: "Softening, filtration and dosing — engineered against site-specific water analysis, monitored through the building's control layer.",
      ka: "შერბილება, ფილტრაცია და დოზირება — დაპროექტებული ობიექტის წყლის ანალიზის მიხედვით, კონტროლირებული შენობის მართვის სისტემიდან.",
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
      en: "Commercial kitchen and laundry infrastructure — ventilation, gas, water and power sized to operational throughput.",
      ka: "კომერციული სამზარეულოსა და სამრეცხაოს ინფრასტრუქტურა — ვენტილაცია, გაზი, წყალი და ელექტრო ნაწილი ფაქტობრივ დატვირთვაზე გათვლილი.",
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
      en: "Structured cabling, distribution and antenna infrastructure — planned for coverage before a single cable is pulled.",
      ka: "სტრუქტურირებული კაბელები, განაწილების და ანტენური ინფრასტრუქტურა — დაფარვის გეგმა შემუშავებული მონტაჟის დაწყებამდე.",
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
      en: "IP camera networks and centralized recording — coverage engineered on plan, integrated with access control and BMS.",
      ka: "IP კამერების ქსელი და ცენტრალიზებული ჩაწერა — დაფარვა დაპროექტებული ნახაზზე, ინტეგრირებული წვდომის სისტემასა და BMS-თან.",
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
      en: "Barrier control, plate recognition and occupancy management — integrated with the building's access layer end-to-end.",
      ka: "შლაგბაუმის მართვა, ნომრის ამოცნობა და დატვირთვის კონტროლი — შენობის წვდომის სისტემასთან სრულად ინტეგრირებული.",
    },
    image: "/media/images/services/parking-automation.avif",
    Icon: ParkingAutomationIcon,
    systems: ["parking-gate"],
  },
];