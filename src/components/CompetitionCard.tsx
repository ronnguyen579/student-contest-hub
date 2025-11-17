import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Trophy, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Competition {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  deadline: string;
  prize: string;
  featured: boolean;
  tags?: string[];
}

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={competition.image}
          alt={competition.title}
          className="w-full h-full object-cover"
        />
        {competition.featured && (
          <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600">
            Nổi bật
          </Badge>
        )}
      </div>
      <CardHeader>
        <Badge variant="outline" className="w-fit mb-2">
          {competition.category}
        </Badge>
        <h3 className="line-clamp-2">{competition.title}</h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 line-clamp-3 mb-4">{competition.description}</p>
        
        {competition.tags && competition.tags.length > 0 && (
          <div className="flex items-start gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {competition.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {competition.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{competition.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{competition.deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>{competition.prize}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/competition/${competition.id}`} className="w-full">
          <Button className="w-full">Xem chi tiết</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}