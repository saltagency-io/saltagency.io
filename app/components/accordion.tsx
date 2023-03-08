import * as React from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import {
  Accordion as ReachAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useAccordionItemContext,
} from '@reach/accordion'

import { H4 } from '~/components/typography'
import type { Section } from '~/types'
import { Markdown } from '~/utils/markdown'

function AccordionItemContent({
  title,
  text,
}: {
  title: string
  text: string
}) {
  const { isExpanded } = useAccordionItemContext()

  return (
    <>
      <H4 as="div" inverse>
        <AccordionButton className="group relative w-full py-6 pr-10 text-left lg:pr-20">
          <span>{title}</span>

          <span
            className={clsx(
              'absolute inset-y-0 right-0 my-auto h-10 w-10 lg:right-8',
              'flex items-center justify-center',
              'rounded-lg transition',
              {
                'bg-transparent': isExpanded,
              },
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              aria-hidden="true"
            >
              <motion.path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
                animate={{ scaleY: isExpanded ? 0 : 1 }}
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </span>
        </AccordionButton>
      </H4>
      <AccordionPanel
        as={motion.div}
        className="block overflow-hidden lg:pr-20"
        initial={false}
        animate={
          isExpanded
            ? { opacity: 1, height: 'auto' }
            : { opacity: 0, height: 0 }
        }
      >
        <Markdown bodyTextSize="xl" textColor="inverse-secondary">
          {text}
        </Markdown>
      </AccordionPanel>
    </>
  )
}

export function Accordion({ items }: { items: Section[] }) {
  return (
    <ReachAccordion collapsible>
      {items.map((item) => (
        <AccordionItem key={item.id} className="border-secondary border-b">
          <AccordionItemContent title={item.title} text={item.text} />
        </AccordionItem>
      ))}
    </ReachAccordion>
  )
}
