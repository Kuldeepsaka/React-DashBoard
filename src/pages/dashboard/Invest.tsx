import React from "react";
import CommonTabs from "../../components/common/CommonTabs";
import { rawTab1, rawTab2, rawTab3 } from "../../components/utils/plansData";
import "./Invest.scss";
import CommonTable from "../../components/common/commonTable";
import CommonPagination from "../../components/common/CommonPagination";
import {
    tableHeading,
    childTableHeading,
    childTableHeading2,
} from "../../components/utils/TableHeadings.tsx";
import {
    TableData,
    TableData2,
    TableData3,
} from "../../components/utils/tableDataTypes.tsx";
import { useModal } from "@ebay/nice-modal-react";

const Invest: React.FC = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(3); // Number of items per page
    const [searchQuery, setSearchQuery] = React.useState(""); // Search query state


    const InvestmentModal = useModal("InvestmentModal");


    // Handle the action click on a row
    const handleActionClick = (row: TableData) => {
        if (row["Action"] === "Invest") {
            InvestmentModal.show({ selectedPlan: row });

        }
    };


    // Prepare data for tables
    const dataTab1: TableData[] = rawTab1.map((item, index) => {
        const actionValue = item["Action"];

        return {
            "Sr. No.": index + 1,
            "Plan Details": item["Plan Details"],
            "Interest Rate": item["Interest Rate"],
            "Investment Range": item["Investment Range"],
            "Lock-in Period": item["Lock-in Period"],
            Action: actionValue,
        };
    });

    const dataTab2: TableData2[] = rawTab2.map((item, index) => ({
        "Sr. No.": index + 1,
        ...item,
    }));

    const dataTab3: TableData3[] = rawTab3.map((item, index) => ({
        "Sr. No.": index + 1,
        ...item,
    }));

    // Filter dataTab1 based on search query
    const filteredData = dataTab1.filter((item) =>
        item["Plan Details"].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredData2 = dataTab2.filter((item) =>
        item["Plan Details"].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredData3 = dataTab3.filter((item) =>
        item["Plan Details"].toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get the total number of pages based on filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const totalPages2 = Math.ceil(filteredData2.length / itemsPerPage);
    const totalPages3 = Math.ceil(filteredData3.length / itemsPerPage);

    // Get the current page data after applying pagination to filtered data
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const currentData2 = filteredData2.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const currentData3 = filteredData3.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Define the tabs

    const childtabs = [
        {
            label: "Active Plans",
            component: (
                <>
                    <CommonTable tableheading={childTableHeading}>
                        {currentData2.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item["Sr. No."]}</td>
                                <td>{item["Plan Details"]}</td>
                                <td>{item["Withdrawals"]}</td>
                                <td>{item["Rewards Allocated"]}</td>
                                <td>{item["Accrued Rewards"]}</td>
                                <td>{item["Rewards Can Claim"]}</td>
                                <td>{item["Interest Rate"]}</td>
                                <td>{item["Amount Invested"]}</td>
                                <td>{item["Days Remaining"]}</td>
                                <td>{item["Total Claims"]}</td>
                            </tr>
                        ))}
                    </CommonTable>
                    <CommonPagination
                        currentPage={currentPage}
                        totalPages={totalPages2}
                        onPageChange={setCurrentPage} // This matches the expected prop type
                    />
                </>
            ),
        },
        {
            label: "Inactive Plan",
            component: (
                <>
                    <CommonTable tableheading={childTableHeading2}>
                        {currentData3.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item["Plan Details"]}</td>
                                <td>{item["Interest Rate"]}</td>
                                <td>{item["Amount Invested"]}</td>
                                <td>{item["Days Remaining"]}</td>
                                <td>{item["Total Claims"]}</td>
                                <td>{item["Status"]}</td>
                                <td>
                                    <span
                                        className={`action-cell ${item["Action"] === "Withdrawals"
                                            ? "text-warning"
                                            : "text-muted"
                                            }`}
                                    >
                                        {item["Action"]}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </CommonTable>

                    <CommonPagination
                        currentPage={currentPage}
                        totalPages={totalPages3}
                        onPageChange={setCurrentPage} // This matches the expected prop type
                    />
                </>
            ),
        },
    ];
    const tabs = [
        {
            label: "Investment Plans",
            component: (
                <>
                    <CommonTable tableheading={tableHeading}>
                        {currentData.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item["Sr. No."]}</td>
                                <td>{item["Plan Details"]}</td>
                                <td>{item["Interest Rate"]}</td>
                                <td>{item["Investment Range"]}</td>
                                <td>{item["Lock-in Period"]}</td>
                                <td onClick={() => handleActionClick(item)}>
                                    <span
                                        className={`action-cell ${item["Action"] === "Invest"
                                            ? "invest-action"
                                            : "text-muted"
                                            }`}
                                    >
                                        {item["Action"]}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </CommonTable>
                    <CommonPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage} // This matches the expected prop type
                    />
                </>
            ),
        },
        {
            label: "Plan History",
            component: (
                <>
                    <CommonTabs
                        tabs={childtabs}
                        searchQuery={searchQuery}
                        showSearch={false}
                        setSearchQuery={setSearchQuery}
                        tabType="child"
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <div className="page-wrapper">
                <CommonTabs
                    tabs={tabs}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>

        </>
    );
};

export default Invest;
