import { Card } from '@roketid/windmill-react-ui'

interface IInfoCard {
    image: string
    title: string
    link: string
}

function InfoCard({ image, title, link }: IInfoCard) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="overflow-hidden min-h-[200px] shadow-md hover:shadow-xl transition-shadow duration-200">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </Card>
        </a>
    )
}

export default InfoCard
