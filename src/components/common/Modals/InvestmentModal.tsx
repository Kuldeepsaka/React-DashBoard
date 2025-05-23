import { useRef, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { TableData } from "../../utils/tableDataTypes";
import CommonModal from "../../commonModal/CommonModal";
import CommonInput from "../commonInput";
import CommonButton from "../CommonButton";
import useGsapModalAnimation from "../Hooks/useGsapModalAnimation";

type Props = {
    selectedPlan: TableData;
};

const InvestmentModal = NiceModal.create(({ selectedPlan }: Props) => {
    const modal = useModal();
    const [amount, setAmount] = useState("");

    const modalRef = useRef<HTMLDivElement>(null);
    const { animateClose } = useGsapModalAnimation(modalRef, modal.visible, () => modal.remove());

    const handleSubmit = () => {
        const [minInvestment, maxInvestment] = selectedPlan["Investment Range"]
            .split("-")
            .map((val) => val.trim());

        const investmentData = {
            "Plan Details": selectedPlan["Plan Details"],
            "Min Investment": minInvestment,
            "Max Investment": maxInvestment,
            "Lock-in Period": selectedPlan["Lock-in Period"],
            Amount: amount,
        };

        console.log(investmentData);

        modal.remove();
    };

    return (
        <CommonModal show={modal.visible} onHide={animateClose}>
            <div className="auth-card" ref={modalRef}>
                <h2 className="mb-4">Investment</h2>

                <div className="form-group">
                    <CommonInput
                        id="plan-details"
                        label="Plan Details"
                        type="text"
                        value={selectedPlan["Plan Details"]}
                        onChange={() => { }}
                    />
                </div>

                <div className="form-group d-flex gap-3">
                    <CommonInput
                        id="min-investment"
                        label="Min Investment"
                        type="text"
                        value={selectedPlan["Investment Range"]?.split("-")[0]?.trim() || ""}
                        onChange={() => { }}
                    />
                    <CommonInput
                        id="max-investment"
                        label="Max Investment"
                        type="text"
                        value={selectedPlan["Investment Range"]?.split("-")[1]?.trim() || ""}
                        onChange={() => { }}
                    />
                </div>

                <div className="form-group">
                    <CommonInput
                        id="lock-in-period"
                        label="Lock-in Period"
                        type="text"
                        value={selectedPlan["Lock-in Period"]}
                        onChange={() => { }}
                    />
                </div>

                <div className="form-group">
                    <CommonInput
                        id="amount"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <CommonButton className="w-100" onClick={handleSubmit}>
                    Submit
                </CommonButton>
            </div>
        </CommonModal>
    );
});

export default InvestmentModal;
