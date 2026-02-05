import Image from 'next/image';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  bgcolor: string;
};

export function SummaryCard(props: SummaryCardProps) {
  return (
    <div
      style={{ backgroundColor: props.bgcolor }}
      className="p-10 sm:p-4 xl:w-[350px] xl:h-[234px] text-white flex flex-col justify-center items-center gap-3 rounded-lg sm:rounded-none xl:rounded-lg"
    >
      <Image src={props.icon} alt={props.title} width={40} height={40} />
      <h4 className="text-[20px] sm:text-[18px] xl:text-[24px]">{props.title}</h4>
      <p className="text-[40px] xl:text-[60px]">{props.value}</p>
    </div>
  );
}
