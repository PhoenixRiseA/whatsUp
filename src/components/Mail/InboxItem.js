const InboxItem = (props) => {
  return (
    <li className={classes.listItem}>
      <p>{props.email}</p>
      <p>{props.sub}</p>
      <p>{props.text}</p>
    </li>
  );
};
export default InboxItem;
