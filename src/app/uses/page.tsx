import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="Here's the gear and software I rely on daily to build Achilleus, run outbound systems, and stay sharp."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool
            title="Dell XPS 15 (7590)"
            href="https://www.dell.com/pl-pl/shop/notebooki-firmy-dell/xps-15/spd/xps-15-7590-laptop"
          >
            15.6" OLED display, 9th-gen Intel Core i7, thin and powerful enough
            to handle everything from running Clay workflows to shipping code.
            The screen alone makes it worth it.
          </Tool>
          <Tool
            title="Logitech MX Master 4"
            href="https://www.logitech.com/pl-pl/shop/p/mx-master-4"
          >
            The best mouse I've ever used. MagSpeed scrolling, multi-device
            switching, and an ergonomic shape that survives long sessions without
            complaint. Once you use it, everything else feels wrong.
          </Tool>
          <Tool
            title="Logitech MX Brio 4K Webcam"
            href="https://www.logitech.com/pl-pl/shop/p/mx-brio-4k-webcam"
          >
            4K at 30fps or crisp 1080p at 60fps. Makes a real difference on
            calls — clients notice when you don't look like you're broadcasting
            from a potato.
          </Tool>
          <Tool
            title="Sony WH-1000XM6"
            href="https://www.sony.pl/headphones/products/wh-1000xm6"
          >
            Sony's best noise-cancelling headphones yet. The ANC is aggressive
            enough to disappear into deep work in any environment. LE Audio
            keeps latency low, multi-point switching is seamless, and they're
            comfortable enough to wear all day without thinking about them.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Claude Code">
            My main coding environment. Handles everything from scaffolding
            features to debugging — faster than any IDE workflow I've tried.
          </Tool>
          <Tool title="VS Code">
            Still the fallback for quick edits and reviewing diffs. Hard to beat
            for sheer ecosystem depth.
          </Tool>
        </ToolsSection>
        <ToolsSection title="GTM & Outbound">
          <Tool title="Clay">
            The backbone of every outbound system I build. Enrichment,
            waterfall logic, AI personalization — all in one place. There's
            nothing else like it.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Notion">
            Where everything lives — product roadmap, research notes, outbound
            sequences. Flexible enough to not get in the way.
          </Tool>
          <Tool title="Slack">
            Where async work actually happens. Keeps client and team
            communication in one place without the noise of email.
          </Tool>
          <Tool title="1Password">
            The only password manager I trust. Especially important when you're
            managing credentials across multiple SaaS tools and client accounts.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
