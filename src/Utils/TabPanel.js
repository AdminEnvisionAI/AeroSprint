import React from 'react';

function TabPanel({ itemKey, content, isSelected }) {
  return isSelected ? <div>{content}</div> : null;
}

export default TabPanel;
