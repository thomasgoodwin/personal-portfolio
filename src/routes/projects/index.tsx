import { createFileRoute } from '@tanstack/react-router'
import Projects from '@/lib/pages/projects';

export const Route = createFileRoute('/projects/')({
  component: Projects,
});
