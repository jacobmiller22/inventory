import { v4 as uuid } from "uuid";
import { Tag, TagId } from "@/types/tags";
import { Tag as TagModel } from "@/models";

const getTags = async (): Promise<Tag[]> => {
  const tags = (await TagModel.find()) ?? [];
  return tags;
};

const createTag = async (tag: Omit<Tag, "tagId">): Promise<TagId | null> => {
  const newTagId = `t_${uuid()}`;
  const newTag = { ...tag, _id: newTagId };

  try {
    await TagModel.create(newTag);
    return newTagId;
  } catch (err) {
    return null;
  }
};

const updateTag = async (
  tagId: TagId,
  tag: Omit<Partial<Tag>, "tagId">
): Promise<boolean> => {
  try {
    await TagModel.findByIdAndUpdate(tagId, tag);
    return true;
  } catch (err) {
    return false;
  }
};

const deleteTag = async (tagId: TagId): Promise<boolean> => {
  try {
    await TagModel.findByIdAndRemove(tagId);
    return true;
  } catch (err) {
    return false;
  }
};

const isValidTag = (tag: any): boolean => {
  if (!tag || typeof tag !== "object" || !tag.tagId || !tag.name) {
    return false;
  }

  return true;
};

export default { getTags, createTag, updateTag, deleteTag, isValidTag };
