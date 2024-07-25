import * as React from 'react'

import { Link } from '@remix-run/react'
import { Asset } from '#types/storyblok.js'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { Modal } from '#app/components/ui/modal.tsx'
import { H5, H6 } from '#app/components/ui/typography.tsx'
import { Markdown } from '#app/utils/markdown.js'

type Props = {
  blockImageFirst: Asset
  blockImageSecond: Asset
  blockTitleFirst: string
  blockTitleSecond: string
  blockContent: string
  blockVideoId?: string
  blockVideoTitle?: string
  blockVideoImage: Asset
}

export function CaseBlocksSection({
  blockImageFirst,
  blockImageSecond,
  blockTitleFirst,
  blockTitleSecond,
  blockContent,
  blockVideoId,
  blockVideoTitle,
  blockVideoImage,
}: Props) {
  const [modalVisible, setModalVisible] = React.useState(false)

  const handlePlayButtonClick = () => setModalVisible(true)

  const handleCloseModal = () => setModalVisible(false)

  return (
    <>
      <Grid className="!gap-x-10">
        <motion.div
          className="col-span-full mb-12 space-y-5 lg:col-span-5 lg:mb-0"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
          }}
        >
          {blockVideoId ? (
            <div
              className={clsx(
                'relative aspect-video overflow-hidden rounded-[32px]',
              )}
            >
              {blockVideoImage ? (
                <figure>
                  <div className="absolute left-0 top-0 h-full w-full bg-video-overlay" />

                  <img
                    src={blockVideoImage.filename}
                    loading="lazy"
                    className="h-full w-full"
                  />
                </figure>
              ) : null}

              <H6
                as="figcaption"
                className="absolute bottom-6 left-6 !text-sm"
                inverse
              >
                {blockVideoTitle}
              </H6>

              <img
                onClick={handlePlayButtonClick}
                loading="eager"
                src="/images/play-button.svg"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer object-contain"
              />
            </div>
          ) : null}

          {blockTitleFirst || blockImageFirst ? (
            <div className="relative h-[474px] overflow-hidden rounded-[32px]">
              <Link
                to={blockImageFirst.filename}
                target="_blank"
                rel="noopener"
              >
                <div className="absolute left-0 top-0 h-full w-full bg-case-overlay" />

                <img
                  src={blockImageFirst.filename}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                <H5
                  as="figcaption"
                  className="absolute bottom-6 left-6"
                  inverse
                >
                  {blockTitleFirst}
                </H5>
              </Link>
            </div>
          ) : null}

          {blockTitleSecond || blockImageSecond ? (
            <div className="relative h-[474px] overflow-hidden rounded-[32px]">
              <Link
                to={blockImageSecond.filename}
                target="_blank"
                rel="noopener"
              >
                <div className="absolute left-0 top-0 h-full w-full bg-case-overlay" />

                <img
                  src={blockImageSecond.filename}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                <H5
                  as="figcaption"
                  className="absolute bottom-6 left-6"
                  inverse
                >
                  {blockTitleSecond}
                </H5>
              </Link>
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="col-span-full lg:col-span-7"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: '-115px 0px' }}
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
          }}
        >
          <motion.div
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0, y: '50px' },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Markdown textColor="inverse">{blockContent}</Markdown>
          </motion.div>
        </motion.div>
      </Grid>

      {modalVisible ? (
        <Modal isOpen={modalVisible} onClose={handleCloseModal}>
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute left-0 top-0 h-full w-full border-0"
              src={`https://www.youtube.com/embed/${blockVideoId}`}
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        </Modal>
      ) : null}
    </>
  )
}
