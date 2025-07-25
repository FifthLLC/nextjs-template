'use client';

import Image from 'next/image';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link,
  Select,
  SelectItem,
} from '@heroui/react';

function SearchDemo() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Search</label>
      <Input
        placeholder="Type to search and watch the URL change..."
        value={search}
        onValueChange={setSearch}
        isClearable
        onClear={() => setSearch('')}
      />
      {search && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current search:{' '}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{search}</span>
        </p>
      )}
    </div>
  );
}

function FilterDemo() {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsStringEnum(['all', 'frontend', 'backend', 'design']).withDefault('all')
  );
  const [priority, setPriority] = useQueryState(
    'priority',
    parseAsStringEnum(['all', 'high', 'medium', 'low']).withDefault('all')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select
          selectedKeys={[category]}
          onSelectionChange={keys => {
            const selected = Array.from(keys)[0] as 'all' | 'frontend' | 'backend' | 'design';
            setCategory(selected || 'all');
          }}
        >
          <SelectItem key="all">All Categories</SelectItem>
          <SelectItem key="frontend">Frontend</SelectItem>
          <SelectItem key="backend">Backend</SelectItem>
          <SelectItem key="design">Design</SelectItem>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Priority</label>
        <Select
          selectedKeys={[priority]}
          onSelectionChange={keys => {
            const selected = Array.from(keys)[0] as 'all' | 'high' | 'medium' | 'low';
            setPriority(selected || 'all');
          }}
        >
          <SelectItem key="all">All Priorities</SelectItem>
          <SelectItem key="high">High Priority</SelectItem>
          <SelectItem key="medium">Medium Priority</SelectItem>
          <SelectItem key="low">Low Priority</SelectItem>
        </Select>
      </div>

      {(category !== 'all' || priority !== 'all') && (
        <div className="md:col-span-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-sm">
            <strong>Active filters:</strong>{' '}
            {category !== 'all' && (
              <Chip size="sm" variant="flat" color="primary" className="mr-1">
                {category}
              </Chip>
            )}
            {priority !== 'all' && (
              <Chip size="sm" variant="flat" color="secondary" className="mr-1">
                {priority} priority
              </Chip>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-2xl">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
          />
          <Chip color="success" variant="flat">
            + HeroUI
          </Chip>
        </div>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <h1 className="text-2xl font-bold">Welcome to Next.js with HeroUI!</h1>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <ol className="font-mono list-inside list-decimal text-sm/6">
              <li className="mb-2 tracking-[-.01em]">
                Get started by editing{' '}
                <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                  src/app/page.tsx
                </code>
                .
              </li>
              <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
              <li className="mt-2 tracking-[-.01em]">Now with beautiful HeroUI components! 🎉</li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
              <Button
                as={Link}
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                startContent={
                  <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt="Vercel logomark"
                    width={20}
                    height={20}
                  />
                }
              >
                Deploy now
              </Button>
              <Button
                as={Link}
                href="https://heroui.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
              >
                HeroUI Docs
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <h2 className="text-xl font-bold">🔍 Nuqs Demo - URL Search Parameters</h2>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try the search and filters below. Notice how the URL updates with your changes!
            </p>

            <div className="flex flex-col gap-4">
              <SearchDemo />
              <FilterDemo />
            </div>
          </CardBody>
        </Card>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          showAnchorIcon
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </Link>
        <Link
          href="https://heroui.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          showAnchorIcon
        >
          Examples
        </Link>
        <Link
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          showAnchorIcon
        >
          Go to nextjs.org
        </Link>
      </footer>
    </div>
  );
}
