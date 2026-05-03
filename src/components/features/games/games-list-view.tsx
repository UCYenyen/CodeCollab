"use client";

import { useGamesList } from "@/hooks/use-games-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Play } from "lucide-react";
import type { GameInfo, GameCategoryData } from "@/types/games-list";

function GameCard({ game }: { game: GameInfo }) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden rounded-2xl border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ring-0">
      <CardHeader className="bg-muted/40 pb-3">
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary font-semibold text-xs mb-2">
          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
        </Badge>
        <CardTitle className="font-display text-xl text-navy group-hover:text-primary transition-colors leading-tight">
          {game.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 flex-grow">
        <CardDescription className="text-sm text-navy/60 line-clamp-3 leading-relaxed">
          {game.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-3 pb-5">
        <Button
          asChild
          className="w-full rounded-xl h-11 font-bold shadow-[3px_3px_0px_0px_var(--navy)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_var(--navy)] active:translate-y-[3px] active:shadow-none transition-all"
        >
          <Link href={game.href}>
            <Play className="mr-2 h-4 w-4" fill="currentColor" />
            Play Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CategorySection({ cat }: { cat: GameCategoryData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 border-b-2 border-primary/20 pb-3">
        <span className="text-3xl leading-none mt-0.5 shrink-0">{cat.emoji}</span>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-display font-bold text-navy leading-tight">{cat.title} Games</h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{cat.description}</p>
        </div>
      </div>
      {cat.games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cat.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-2xl border-2 border-dashed border-border">
          <span className="text-5xl mb-3 opacity-40">{cat.emoji}</span>
          <h3 className="text-base font-bold text-navy mb-1">Coming Soon</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            New games for the {cat.title} category are on the way. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

export function GamesListView() {
  const { categories } = useGamesList();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 sm:pt-10 mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-navy mb-2 sm:mb-3">
            Games Library
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Explore our collection of cognitive games designed to train specific brain superpowers.
          </p>
        </div>

        <Tabs defaultValue="all" className="flex flex-col w-full gap-0">
          <div className="w-full overflow-x-auto pb-2 mb-6 sm:mb-8">
            <TabsList className="inline-flex h-auto w-max p-1 gap-1 bg-muted/60 rounded-2xl">
              <TabsTrigger
                value="all"
                className="rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                All Games
              </TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.category}
                  value={cat.category}
                  className="rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-1.5"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="w-full mt-0 space-y-8 sm:space-y-12">
            {categories.map((cat) => (
              <CategorySection key={cat.category} cat={cat} />
            ))}
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat.category} value={cat.category} className="w-full mt-0">
              <CategorySection cat={cat} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
