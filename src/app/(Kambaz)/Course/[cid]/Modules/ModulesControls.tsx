"use client";

import { Button } from "react-bootstrap";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import GreenCheckmark
 from "./GreenCheckmark";
export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="d-flex align-items-center flex-wrap gap-2"
    >
      {/* Module Button */}
      <Button
        variant="danger"
        size="lg"
        id="wd-add-module-btn"
      >
        Module
      </Button>

      {/* Publish Dropdown */}
      <Dropdown>
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* View Progress button */}
      <Button variant="secondary" size="lg" id="wd-view-progress">
        View Progress
      </Button>

      {/* Collapse All button */}
      <Button variant="secondary" size="lg" id="wd-collapse-all">
        Collapse All
      </Button>
    </div>
  );
}