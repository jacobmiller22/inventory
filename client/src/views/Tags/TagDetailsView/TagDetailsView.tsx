import { useEffect, useState } from "react";
import { getTag } from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { editTagRoute } from "Router/routes/client";
import { Tag } from "interfaces/tag";
import { DetailsView } from "views";
import { FourOFour, Loader } from "components";

const LocationDetailsView = () => {
  const [tag, setTag] = useState<Tag | null | undefined>(undefined);

  const query = useParams();

  useEffect(() => {
    if (!query.tagId) return;

    (async () => {
      setTag(await getTag(query.tagId!));
    })();
  }, [query]);

  if (tag === undefined) {
    return <Loader />;
  }

  if (tag === null) {
    return <FourOFour article={`Tag, ${query.tagId}`} />;
  }

  return (
    <DetailsView
      editRoute={editTagRoute}
      idKey="tagId"
      item={tag}
    ></DetailsView>
  );
};

export default LocationDetailsView;
