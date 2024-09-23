import React from 'react';
import { useSelector } from 'react-redux';

import ShowVideo from '../ShowVideo/ShowVideo';

function ShowVideoList({ videoId }) {
  const vids = useSelector((state) => state.videoReducer);

  if (!vids || !vids.data) {
    return <div>No videos found</div>;
  }

  if (!videoId) {
    return <div>Video ID is required</div>;
  }

  return (
    <div className="Container_ShowVideoGrid">
      {
        vids.data.filter((vi) => vi._id === videoId).map((vi) => (
          <div key={vi._id} className="video_box_app">
            <ShowVideo vid={vi} />
          </div>
        ))
      }
    </div>
  );
}

export default ShowVideoList;