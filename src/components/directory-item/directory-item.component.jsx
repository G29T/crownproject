import DirectoryItemBody from "../directory-item-body/directory-item-body.component";

// this is a functional component
const DirectoryItem = ({category}) => {
    const {id, imageUrl,title} = category
    return (
        <div className="directory-item-container" key={id}>
            <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
            }}/>
            <DirectoryItemBody title={title}/>
      </div>
    )
}

export default DirectoryItem;