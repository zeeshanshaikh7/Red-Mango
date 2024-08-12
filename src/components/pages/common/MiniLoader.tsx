interface prop {
    type: string,
    size: number
}

const MiniLoader = (props: prop) => {
    return (
        <div className={`spinner-border text-${props.type}`} style={{ scale: `${props.size}%` }}>{" "}</div>
    )
}

export default MiniLoader