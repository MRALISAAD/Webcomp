import { Card, CardContent } from "./ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  city: string;
  image: string;
}

const TestimonialCard = ({ quote, author, role, city, image }: TestimonialCardProps) => (
  <Card className="h-full">
    <CardContent className="space-y-4">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={`${author}, ${role}`}
          loading="lazy"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold text-ink dark:text-textLight">{author}</p>
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {role} • {city}
          </p>
        </div>
      </div>
      <blockquote className="text-sm italic text-zinc-600 dark:text-zinc-300">“{quote}”</blockquote>
    </CardContent>
  </Card>
);

export default TestimonialCard;
