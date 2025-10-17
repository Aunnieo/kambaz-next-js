"use client";

import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./ BackgroundColors";
import Borders from "./ Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForm";
import BootstrapNavigation from "./BootstrapNavigation";
import TOC from "../TOC";

export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2>

      <h3>Styling with the STYLE attribute</h3>
      <p>
        The style attribute allows configuring look and feel right on the element.
        Although convenient, it is considered bad practice and should be avoided.
      </p>

      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing all elements of the same type, e.g., &lt;p&gt;, we
          can refer to a specific element by its ID.
        </p>
        <p id="wd-id-selector-2">
          Heres another paragraph using a different ID and a different look and feel.
        </p>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element&apos;s
          CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has the same style as the paragraph above
        </h4>

        <div id="wd-css-document-structure">
          <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
              Selectors can be combined to refer to elements in particular places in the document.
              <p className="wd-selector-3">
                This paragraph&apos;s red background is referenced as
                <br />
                <code>.selector-2 .selector-3</code>
                <br />
                meaning a descendant of some ancestor.
                <br />
                <span className="wd-selector-4">
                  This span is a direct child of its parent.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <ReactIconsSampler />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />
      <TOC />
    </Container>
  );
}
