import React from "react";

/**
 * ColumnLayout is the responsive grid system we created for Kolibri,
 * we use maximum 6 columns as the device size increases.
 * All we need to specify are the columns amount it occupies in desktop, tablet, and mobile devices."
 */
function ColumnLayout({
  mobileSize,
  tabletSize,
  desktopSize,
  children
}) {

  let errorJsx = [];
  if (mobileSize === undefined && tabletSize === undefined && desktopSize === undefined) {
    throw new Error("Please set at least one of mobileSize, tableSize, and desktopSize");
  }

  let columnClass = "ColumnLayout";
  if (desktopSize !== undefined) {
    if (desktopSize === 0) {
      columnClass += " col-desktop-hidden";
    }
    else {
      columnClass += " col-desktop-" + desktopSize;
    }
  }

  if (tabletSize !== undefined) {
    if (tabletSize === 0) {
      columnClass += " col-tablet-hidden";
    }
    else {
      columnClass += " col-tablet-" + tabletSize;
    }
  }

  if (mobileSize !== undefined) {
    if (mobileSize === 0) {
      columnClass += " col-mobile-hidden";
    }
    else {
      columnClass += " col-mobile-" + mobileSize;
    }
  }

  return (
    <div className={columnClass}>
      {errorJsx}
      {children}
    </div>
  );
}

// Validate input column sizes
function columnSizeValidation(props, propName, componentName) {
  componentName = componentName || "ANONYMOUS";

  if (props[propName]) {
    const size = props[propName];

    if (typeof size === "number") {
      return (size <= 6 && size >= 0)
           ? null
           : new Error("Prop " + propName + " in " + componentName + " is " + size + ", should be a number between 0 to 6");
    }
    else {
      return new Error("Prop " + propName + " in " + componentName + " should be a number, not a " + typeof size);
    }
  }
}

ColumnLayout.propTypes = {
  /**
   * When <b>ONLY</b> set mobileSize, it <b>ONLY</b> controls column width in <code>mobile devices</code>.
   * But desktop and tablet devices will lose width setting.
   * Set a number between <code>0(hidden)</code> to <code>6</code>,
   * which specifies the amount of total columns it occupies in mobile devices.
   */
  mobileSize: columnSizeValidation,
  /**
   * When <b>ONLY</b> set tabletSize, the column width will be the same in both <code>tablet and mobile devices</code>.
   * But desktop devices will lose width setting.
   * Set a number between <code>0(hidden)</code> to <code>6</code>,
   * which specifies the amount of total columns it occupies in tablet devices.
   */
  tabletSize: columnSizeValidation,
  /**
   * When <b>ONLY</b> set desktopSize, the column width will be the same in <code>all devices</code>.
   * Set a number between <code>0(hidden)</code> to <code>6</code>,
   * which specifies the amount of total columns it occupies in desktop devices.
   */
  desktopSize: columnSizeValidation
};

export default ColumnLayout;
