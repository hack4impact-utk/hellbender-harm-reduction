import { Typography } from '@mui/material';
import EventListView from '@/views/eventListView';
import { getAllTags } from '@/server/actions/tag';

export default async function Home() {
  // gets all tags
  const alltags = await getAllTags();

  // error if can't get any tags
  if (!alltags) {
    return <Typography>No Tags Found</Typography>;
  }

  // gets tags for add/edit event component
  const allTagsFixed = alltags.map((tag) => ({
    _id: String(tag._id),
    tagName: tag.tagName,
  }));

  return <EventListView tags={allTagsFixed} />;
}
