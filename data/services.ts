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

export type ServiceItem = {
  title: string;
  slug: string;
  Icon: ServiceIcon;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Building exterior / interior",
    slug: "building-exterior-interior",
    Icon: BuildingArchitectureIcon,
  },
  {
    title: "Fire alarm and sound system",
    slug: "fire-alarm-sound",
    Icon: FireSystemSignalIcon,
  },
  {
    title: "Generator and transformer system",
    slug: "generator-transformer",
    Icon: GeneratorIcon,
  },
  {
    title: "Electrical systems",
    slug: "electrical-systems",
    Icon: ElectricalSystemIcon,
  },
  {
    title: "Air conditioning",
    slug: "air-conditioning",
    Icon: AirConditioningIcon,
  },
  {
    title: "Plumbing and mechanical works",
    slug: "plumbing-mechanical",
    Icon: PlumbingIcon,
  },
  {
    title: "Boiler – heating system",
    slug: "boiler-heating",
    Icon: BoilerHeatingIcon,
  },
  {
    title: "Water treatment",
    slug: "water-treatment",
    Icon: WaterIcon,
  },
  {
    title: "Kitchen and laundry appliances",
    slug: "kitchen-laundry",
    Icon: KitchenwareIcon,
  },
  {
    title: "Telecommunication / TV system",
    slug: "telecommunication-tv",
    Icon: TelecommunicationIcon,
  },
  {
    title: "CCTV / monitoring system",
    slug: "cctv-monitoring",
    Icon: CctvIcon,
  },
  {
    title: "Parking automation system",
    slug: "parking-automation",
    Icon: ParkingAutomationIcon,
  },
];
