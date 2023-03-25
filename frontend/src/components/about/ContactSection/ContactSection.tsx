import Image from "next/image"
import Link from "next/link"
import Header from "@/components/shared/Header/Header"
import styles from "./ContactSection.module.scss"

import instagramLogo from "super-tiny-icons/images/svg/instagram.svg"
import facebookLogo from "super-tiny-icons/images/svg/facebook.svg"
import emailLogo from "super-tiny-icons/images/svg/email.svg"
import whatsappLogo from "super-tiny-icons/images/svg/whatsapp.svg"

function Social({ link, logo, alt }: { link: string, logo: any, alt: string }) {
    return (
        <Link className={styles['social']} target="_blank" href={link}>
            <div>
                <Image src={logo.src} width={52} height={52} alt={alt} />
            </div>
        </Link>
    )
}

export default function ContactSection() {

    return (
        <section className={styles['contact']}>
            <Header type="h2">Contact</Header>
            <div className={styles['socials']}>
                <Social link={"https://www.instagram.com/art_maase.yotser/"} logo={instagramLogo} alt={"Instagram"} />
                <Social link={"https://www.facebook.com/people/Michael-turjman-maaseyotser/100046479806668/"} logo={facebookLogo} alt={"Facebook"} />
                <Social link={"mailto: michael@maase-yotser.com"} logo={emailLogo} alt={"Email"} />
                <Social link={"tel:0546312953"} logo={whatsappLogo} alt={"Phone number"} />
            </div>
        </section>
    )
}