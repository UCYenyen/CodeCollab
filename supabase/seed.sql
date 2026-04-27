-- Seed data for CodeColab
-- Run automatically by `supabase db reset` after migrations

-- Games catalog
INSERT INTO public.games (name, description) VALUES
  ('Word Builder', 'Build words from jumbled letters to boost vocabulary and spelling skills.'),
  ('Math Quest',   'Solve fun math puzzles and equations across increasing difficulty levels.'),
  ('Story Sparks', 'Complete creative stories by choosing the right words and sentences.'),
  ('Code Critters', 'Learn basic programming logic by guiding friendly creatures through mazes.');
