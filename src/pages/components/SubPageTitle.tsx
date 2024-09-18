interface SubPageTitleProps {
    title: string;
}

export default function SubPageTitle( { title }: SubPageTitleProps ) {
    return (
        <h2 className="font-schoolbell">{ title }</h2>
    );
}