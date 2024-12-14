variable "TAG" {
    default = "latest"
}

target "default" {
    matrix = {
        tgt = ["dev", "prod"]
    }
    name = tgt
    contexts = {
        frontend = "../.."
    }
    target = tgt
    tags = ["mesto/host:${TAG}"]
    platforms = ["linux/amd64"]
}
