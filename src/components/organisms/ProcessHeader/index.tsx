
import { ProcessFlowProps } from "@/types";
import ProcessFlowItem from "../ProcessOrderFlow/ProcessFlowItem";

interface ProcessHeaderProps {
    flowData: ProcessFlowProps[];
    status: string
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({ flowData, status }) => {

    return (
        <div className="flex justify-start items-center gap-[13px]">
            {flowData.map((flow) => (
                <ProcessFlowItem
                    line={flow.line}
                    active={status === flow.status}
                    icon={flow.icon}
                    label={flow.label}
                />
            ))}
        </div>
    );
};

export default ProcessHeader;