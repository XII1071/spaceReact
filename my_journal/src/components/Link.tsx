import type {FC} from 'react'
import type {LinkProps as RRLinkProps} from 'react-router-dom'
import {Link as RRLink, useMatch, useResolvedPath} from 'react-router-dom'

export type LinkProps = RRLinkProps & {}

const Link: FC<LinkProps> = ({className: _className, to, ...props}) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({path: resolved.pathname, end: true})
  const className = [
    _className,
    'btn btn-link',
    match ? 'btn-active' : 'text-gray-800 no-underline hover:no-underline'
  ].join(' ')
  return <RRLink {...props} to={to} className={className} />
}
export default Link
