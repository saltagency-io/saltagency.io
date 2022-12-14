import { Grid } from '~/components/grid'

type Props = {
  title: string
  body: string
  image?: {
    url: string
    alt: string
  }
}

export function Hero({ title, body, image }: Props) {
  return (
    <header>
      <Grid>
        <div className="col-span-12">
          <h1 className="text-white text-4xl mb-4">{title}</h1>
          <p className="text-white">{body}</p>
        </div>
        {image ? <img src={image.url} alt={image.alt} /> : null}
      </Grid>
    </header>
  )
}
