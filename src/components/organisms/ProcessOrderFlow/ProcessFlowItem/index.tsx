import { ProcessFlowProps } from "@/types";
function ProcessFlowItem({
    label = "",
    icon: IconComponent,
    line = false,
    active = false,
}: { label: string, icon: any, line: boolean, active: boolean }) {
    return (
        <div className="flex flex-col items-center min-w-[113px] max-w-[133px]">
            <div
                className={`flex justify-start items-center`}>
                <div className="flex flex-col items-center">
                    <div className="relative ">
                        <div className="    border-1 
                                border-pink-300 min-w-[50px] min-h-[50px] rounded-full flex items-center justify-center">
                            <IconComponent
                                className={` min-w-[25px] min-h-[25px]   ${active ? "text-pink-600" : "text-pink-400 "}`}
                            />
                        </div>
                        {
                            line && (
                                <div className="h-[2px] w-[60px] bg-pink-500 rounded-sm overflow-hidden absolute left-[56px] top-[50%] translate-y-[-50%]  ">
                                    <div
                                        className={` rounded-sm  h-full`}></div>
                                </div>
                            )
                        }
                    </div >
                    <p className="whitespace-nowrap mt-3">{label}</p>
                </div >
            </div >
        </div >
    );
}

export default ProcessFlowItem;