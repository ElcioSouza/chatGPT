import { GoogleMap, LoadScript } from "@react-google-maps/api";

import Modal from "./Modal";
import React from "react";

interface MapsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MapsModal({ isOpen, setIsOpen }: MapsModalProps) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-5">
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJNd1LEo-KtwARzb35NCRAh0E&key=AIzaSyClPqpJh83z3MeCoYZBrVkiMaei_8DOHs4"
        ></iframe>
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJw0MrJzs8uAARa1spofRo4VQ&key=AIzaSyClPqpJh83z3MeCoYZBrVkiMaei_8DOHs4"
        ></iframe>
      </div>
    </Modal>
  );
}
