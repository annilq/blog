"use client"

import { Button, Input, List, ListItem, ListItemContent, Modal, ModalClose, ModalDialog, ModalOverflow, Typography } from '@mui/joy';
import { Post } from '@prisma/client';
import Fuse, { FuseResult, RangeTuple } from 'fuse.js'
import { Search, } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FuseHighlight from './hightlight';

const options = {
  // only filter by content,so we can print match value
  keys: [
    {
      name: 'title',
      weight: 0.3
    },
    // {
    //   name: 'categorys',
    //   weight: 0.2
    // },
    {
      name: 'content',
      weight: 0.7
    }
  ],
  threshold: 0.1,
  minMatchCharLength: 1,
  includeMatches: true,
};

export default function SearchInput({
  data,
}: {
  data: Post[];
}) {

  const fuseRef = useRef<Fuse<Post>>()
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [matchPost, setMatchPost] = useState<FuseResult<Post>[]>([]);

  useEffect(
    () => {
      fuseRef.current = new Fuse<Post>(data, options);
      return () => {
        setMatchPost([])
        setValue("")
      }
    }, [])

  useEffect(
    () => {
      const matchList = fuseRef.current?.search(value)
      if (matchList) {
        setMatchPost(matchList)
      } else {
        setMatchPost([])
      }

    }, [value])

  return (
    <div className='w-full'>
      <Button
        startDecorator={<Search />}
        onClick={() => setOpen(true)}
        variant="soft"
        sx={{
          "justifyContent": "start",
          "textAlign": "start",
          "width": "100%",
          "mb": 2,
        }}
      >Search here…</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ bgcolor: 'background.paper' }}
        disableRestoreFocus
      >
        <ModalOverflow>
          <ModalDialog sx={{ width: "50%", height: "70%", top: "10%" }}>
            {/* <ModalClose /> */}
            <Input
              autoFocus
              startDecorator={<Search />}
              placeholder="Search here…"
              variant="soft"
              sx={{
                '&::before': {
                  display: 'none',
                },
                '&:focus-within': {
                  outline: '2px solid var(--Input-focusedHighlight)',
                  outlineOffset: '2px',
                },
              }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value?.trimStart?.())
              }}
            />
            <List
              sx={{ '--ListItemDecorator-size': '56px' }}
            >
              {matchPost?.map(match => {
                const { item, matches } = match

                return (
                  <Link key={item.id} href={`/post/${item.id}`} className="hover:bg-blue-100 cursor-pointer">
                    <ListItem>
                      <ListItemContent>
                        <Typography level="title-sm">
                          <FuseHighlight
                            matches={matches}
                            value={item.title}
                            name="title"
                          />
                        </Typography>
                        <Typography level="body-sm" noWrap>
                          <FuseHighlight
                            matches={matches}
                            value={item.content!}
                            name="content"
                          />
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                  </Link>
                )
              })}
              {matchPost.length === 0 && (
                <div className='text-center'>
                  No matches
                </div>
              )}
            </List>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </div>
  );
}
