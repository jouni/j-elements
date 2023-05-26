export function positionPopup(popupElement, anchorElement) {
  const isRtl = getComputedStyle(popupElement).getPropertyValue('direction') == 'rtl';

  popupElement.style.removeProperty('width');
  popupElement.style.removeProperty('height');
  popupElement.style.removeProperty('transform');

  const anchor = anchorElement.getBoundingClientRect();
  const popup = popupElement.getBoundingClientRect();
  const popupCs = getComputedStyle(popupElement);
  const horizontal = popupCs.getPropertyValue('--popup-align').trim().toLowerCase() == 'horizontal';

  // TODO this assumes a uniform margin around the popup
  const popupMargin = parseInt(popupCs.getPropertyValue('margin'));
  let popupRequiredHeight = popup.height + popupMargin * 2;
  let popupRequiredWidth = popup.width + popupMargin * 2;

  const pageWidth = document.documentElement.clientWidth;
  const pageHeight = document.documentElement.clientHeight;
  // const pageWidth = visualViewport.width;
  // const pageHeight = visualViewport.height;
  // TODO take zoom into account somehow

  const spaceAboveAnchor = anchor.top;
  const spaceBelowAnchor = pageHeight - anchor.top - (horizontal ? 0 : anchor.height);
  const spaceBeforeAnchor = isRtl ? pageWidth - anchor.left - anchor.width : anchor.left;
  const spaceAfterAnchor = isRtl ? anchor.left : pageWidth - anchor.left - (horizontal ? anchor.width : 0);

  let x = 0, y = 0;

  if (spaceBeforeAnchor > spaceAfterAnchor && (popupRequiredWidth > pageWidth / 2 || popupRequiredWidth > spaceAfterAnchor)) {
    // Place before anchor
    if (isRtl) {
      x = anchor.left + (horizontal ? anchor.width : -popupMargin) + popupRequiredWidth - pageWidth;
    } else {
      x = anchor.left + (horizontal ? 0 : anchor.width + popupMargin) - popupRequiredWidth;
    }
  } else {
    // Place after anchor
    if (isRtl) {
      x = anchor.left + (horizontal ? 0 : anchor.width + popupMargin) - pageWidth;
    } else {
      x = anchor.left + (horizontal ? anchor.width : -popupMargin);
    }
  }

  if (spaceAboveAnchor > spaceBelowAnchor && (popupRequiredHeight > pageHeight / 2 || popupRequiredHeight > spaceBelowAnchor)) {
    // Place popup above anchor
    if (popupRequiredHeight > spaceAboveAnchor) {
      popupElement.style.height = (spaceAboveAnchor - popupMargin * 2) + 'px';
      popupRequiredHeight = spaceAboveAnchor;
    }
    y = anchor.top - popupRequiredHeight + (horizontal ? anchor.height + popupMargin : 0);
  } else {
    // Place popup below anchor
    if (popupRequiredHeight > spaceBelowAnchor) {
      popupElement.style.height = (spaceBelowAnchor - popupMargin * 2) + 'px';
    }
    y = anchor.top + (horizontal ? -popupMargin : anchor.height);
  }

  // In Safari, the visual viewport offset affects the transform/translate
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    x += visualViewport.offsetLeft;
    y += visualViewport.offsetTop;
  }

  // Keep inside the browser viewport
  if (isRtl) {
    if (popupRequiredWidth - x > pageWidth) {
      x -= pageWidth - popupRequiredWidth + x;
    }
    x = Math.min(x, 0);
  } else {
    if (x + popupRequiredWidth > pageWidth) {
      x -= x + popupRequiredWidth - pageWidth;
    }
    x = Math.max(x, 0);
  }

  if (popupElement.slot === 'tooltip') {
    // Need to adjust coordinates inside a menu dialog
    let tooltipSlot = popupElement.assignedSlot;
    while (tooltipSlot.slot === 'tooltip') tooltipSlot = tooltipSlot.assignedSlot;
    const dialogBox = tooltipSlot.parentNode.getBoundingClientRect();
    x -= dialogBox.x;
    y -= dialogBox.y;
  }
  popupElement.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
}
