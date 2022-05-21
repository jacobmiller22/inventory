import { Request, Response } from "express";
import { isValidTagId, Tag, TagId } from "@/types/tag";
import tagsService from "@/services/tags";
import { HttpStatus } from "@/types/http";

const getTags = async (req: Request, res: Response) => {
  /** Get all types */

  const tags: Tag[] = await tagsService.getTags();

  return res.status(200).json(tags);
};

const getTag = async (req: Request, res: Response) => {
  /** Get information about a tag */
  const tagId: any = req.params.tagId;

  if (!isValidTagId(tagId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid tagId");
  }

  const item = await tagsService.getTag(tagId);

  if (!item) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  return res.status(HttpStatus.OK).json(item);
};

const createTag = async (req: Request, res: Response) => {
  /** Add a new type */
  const tag: Omit<Tag, "tagId"> = { name: req.body.name };

  const tagId: TagId | null = await tagsService.createTag(tag);

  if (!tagId) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).json(tagId);
};

const updateTag = async (req: Request, res: Response) => {
  /** Update a type */
  const tagId: TagId = req.params.tagId;

  if (!isValidTagId(tagId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid tagId");
  }

  const tag: Omit<Partial<Tag>, "tagId"> = { name: req.body.name };

  const success: boolean = await tagsService.updateTag(tagId, tag);

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  return res.status(HttpStatus.OK).end();
};

const deleteTag = async (req: Request, res: Response) => {
  /** Delete a tag */
  const tagId: TagId = req.params.tagId;

  if (!isValidTagId(tagId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid tagId");
  }

  const success: boolean = await tagsService.deleteTag(tagId);

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  return res.status(HttpStatus.OK).end();
};

export default { getTags, getTag, createTag, updateTag, deleteTag };
