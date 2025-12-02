import React, { useState } from "react";
import InlinePreview from "./InlinePreview.jsx";
import SalesModal from "./SalesModal.jsx";

export default function SalesList({ people = [], limit = 3 }) {
    const [open, setOpen] = useState(false);

    if (!people?.length) {
        return <span className="text-gray-400">N/A</span>;
    }

    return (
        <>
            <InlinePreview
                people={people}
                limit={limit}
                onOpen={() => setOpen(true)}
            />

            {open && (
                <SalesModal
                    people={people}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
