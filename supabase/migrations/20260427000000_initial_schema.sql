-- Enums
CREATE TYPE public.gender AS ENUM ('Male', 'Female');

-- Parents (one row per auth user with role=parent)
CREATE TABLE public.parents (
  id         uuid        NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can read own record"
  ON public.parents FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Parents can update own record"
  ON public.parents FOR UPDATE
  USING (auth.uid() = id);

-- Children (one row per auth user with role=child)
CREATE TABLE public.children (
  id            uuid          NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  coins         integer       DEFAULT 0,
  created_at    timestamptz   NOT NULL DEFAULT now(),
  date_of_birth date          NOT NULL,
  gender        public.gender NOT NULL
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Children can read own record"
  ON public.children FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Children can update own record"
  ON public.children FOR UPDATE
  USING (auth.uid() = id);

-- Games (catalog of available games)
CREATE TABLE public.games (
  id          bigserial   PRIMARY KEY,
  created_at  timestamptz NOT NULL DEFAULT now(),
  description text,
  name        text
);

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read games"
  ON public.games FOR SELECT
  USING (true);

-- Histories (play sessions per child per game)
CREATE TABLE public.histories (
  id                bigserial   PRIMARY KEY,
  "coins_ received" integer,
  created_at        timestamptz NOT NULL DEFAULT now(),
  refrence_children uuid        REFERENCES public.children(id) ON DELETE SET NULL,
  refrence_game     bigint      REFERENCES public.games(id)    ON DELETE SET NULL,
  suggestion        text
);

ALTER TABLE public.histories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Children can read own history"
  ON public.histories FOR SELECT
  USING (auth.uid() = refrence_children);

CREATE POLICY "Children can insert own history"
  ON public.histories FOR INSERT
  WITH CHECK (auth.uid() = refrence_children);
