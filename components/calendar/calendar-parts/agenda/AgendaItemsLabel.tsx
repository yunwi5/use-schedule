import React, { memo } from "react";
import {
    CalendarItemType,
    CalendarItemTypeList,
    getItemIcon,
    getItemTextColorClass,
} from "../../../../models/calendar-models/CalendarItemType";

const mappedItemTypeList = CalendarItemTypeList.map((itemType) => ({
    name: itemType !== CalendarItemType.TODO ? itemType : "Todo",
    color: getItemTextColorClass(itemType),
    icon: getItemIcon(itemType),
}));

const AgendaItemsLabel = () => (
    <div className="flex gap-6">
        {mappedItemTypeList.map((item) => (
            <div key={item.name} className={`flex items-center ${item.color}`}>
                {item.icon}
                <p>{item.name}</p>
            </div>
        ))}
    </div>
);

export default memo(AgendaItemsLabel);
